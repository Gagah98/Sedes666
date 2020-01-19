import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Bench } from '../models/bench';
import { BenchPage } from '../models/benchPage';

import { IonInfiniteScroll} from '@ionic/angular';


export interface HomePageTab {
  title: string; // The title of the tab in the tab bar
  icon: string; // The icon of the tab in the tab bar
  path: string; // The route's path of the tab to display
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  benches: Bench[];
  count: number;

  constructor(private auth: AuthService,
    private router: Router,
    public http: HttpClient) {
  }

  ngOnInit() {
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    this.count = 1;
    const benchesUrl = `${environment.apiUrl}/benches`
    this.http.get<BenchPage>(benchesUrl).subscribe(result => {
      console.log(`Benches loaded`, result);
      this.benches = result.data;

      this.benches.forEach(bench => {
        var apikey = environment.OCD_API_KEY;
        var latitude = bench.location.coordinates[0];
        var longitude = bench.location.coordinates[1];

        var api_url = environment.geocodeApi + '/geocode/v1/json'

        var request_url = api_url
          + '?'
          + 'key=' + apikey
          + '&q=' + encodeURIComponent(latitude + ',' + longitude)
          + '&pretty=1'
          + '&no_annotations=1';

        this.http.get(request_url).subscribe((result: any) => {
          bench.address = result.results[0].formatted;
        });
      })

    });

  }

  loadData(event) {
    this.count++;
    console.log(this.count);
    setTimeout(() => {
      const benchesUrl = `${environment.apiUrl}/benches?page=${this.count}`
      this.http.get<BenchPage>(benchesUrl).subscribe(result => {
        console.log(`Benches loaded`, result);
        var loadedBenches = result.data;
        loadedBenches.forEach(bench => {
          console.log(bench);
          const el = document.createElement('ion-card');
          el.setAttribute("ng-reflect-router-link", `/bench, ${bench._id}`); 
          
          el.innerHTML = `
          <a class="card-native sc-ion-card-md sc-ion-card-md-s" href="/bench/${bench._id}">
            <ion-card-header tappable>0
              <ion-img [src]="${bench.image}"></ion-img>
              <ion-card-title>${bench.description}</ion-card-title>
              <ion-item>
                <ion-img [src]="${bench.image}"></ion-img>
                <ion-icon name="pin" slot="start"></ion-icon>
                <ion-label>${bench.address}</ion-label>
                <ion-buttons slot="end">
                  <ion-icon (click)="scoreUp(bench.score)" class="score-arrow" name="arrow-up"></ion-icon>
                  <ion-label>${bench.score}</ion-label>
                  <ion-icon (click)="scoreDown(bench.score)" class="score-arrow" name="arrow-down"></ion-icon>
                </ion-buttons>
              </ion-item>
            </ion-card-header>
      `;
       console.log(el);
       document.getElementById('list').appendChild(el);})
      });
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.benches.length == 1000) {
        event.target.disabled = true;
        console.log(this.benches.length)
      }
    }, 500);
  }


  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }




}

