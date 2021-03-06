import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';

import { environment } from "src/environments/environment";

import { IonInfiniteScroll } from '@ionic/angular';

import { Bench } from "../models/bench";
import { BenchPage } from "../models/benchPage";

export interface HomePageTab {
  title: string; // The title of the tab in the tab bar
  icon: string; // The icon of the tab in the tab bar
  path: string; // The route's path of the tab to display
}

@Component({ selector: "app-home", templateUrl: "./home.page.html", styleUrls: ["./home.page.scss"] })
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  benches: Bench[];
  count: number;
  material: string;

  constructor(private auth: AuthService, private router: Router, public http: HttpClient) { }

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

  scoreUp(benchScore) {
    benchScore += 1
    console.log(benchScore)

  }

  scoreDown(benchScore) {
    benchScore -= 1
  }

  loadData(event) {
    this.count++;
    console.log(this.count);
    setTimeout(() => {
      const benchesUrl = `${environment.apiUrl}/benches?page=${this.count}`
      this.http.get<BenchPage>(benchesUrl).subscribe(result => {
        var loadedBenches = result.data;
        if (loadedBenches.length != 0) {
          console.log(`More benches loaded`, loadedBenches);
          if (this.material) {
            loadedBenches.forEach(bench => {
              if (bench.material == this.material) {
                this.benches.push(bench);
              }
            })
          } else {
            loadedBenches.forEach(bench => {
              this.benches.push(bench);
            })
          }
        } else {
          this.toggleInfiniteScroll();
        }
      });
      console.log('Done');
      event.target.complete();
    }, 500);
  }


  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  filter(material) {
    this.material = material;
    console.log(material);
    this.benches = [];
    const benchesUrl = `${environment.apiUrl}/benches`;
    this.http.get<BenchPage>(benchesUrl).subscribe(result => {
      var loadedBenches = result.data;
      console.log(`Benches filtered`, loadedBenches);
      loadedBenches.forEach(bench => {
        if (bench.material == material) {
          this.benches.push(bench);
        }
      })
    });
    console.log("ok c filtré");
  }

  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

}