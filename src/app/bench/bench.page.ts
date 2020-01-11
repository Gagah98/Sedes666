import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Bench } from '../models/bench';
import * as opencage from 'opencage-api-client';

@Component({
  selector: 'app-bench',
  templateUrl: './bench.page.html',
  styleUrls: ['./bench.page.scss'],
})

export class BenchPage implements OnInit, OnDestroy {
  benchId: any;
  bench: Bench;
  city: any;
  data: any;

  constructor(
    private route: ActivatedRoute,
    public http: HttpClient,
  ) {

  }

  ngOnInit() {
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    this.route.params.subscribe(params => {
      this.benchId = params['id'];
    });
    const benchUrl = `${environment.apiUrl}/benches/${this.benchId}`
    this.http.get<BenchPage>(benchUrl).subscribe(result => {
      console.log(`Bench loaded`, result);
      this.bench = result[0];

      // convert lat long into city
      var apikey = environment.OCD_API_KEY;
      var latitude = this.bench.location.coordinates[0];
      var longitude = this.bench.location.coordinates[1];

      var api_url = 'https://api.opencagedata.com/geocode/v1/json'

      var request_url = api_url
        + '?'
        + 'key=' + apikey
        + '&q=' + encodeURIComponent(latitude + ',' + longitude)
        + '&pretty=1'
        + '&no_annotations=1';

      console.log(request_url);

      // see full list of required and optional parameters:
      // https://opencagedata.com/api#forward

      var request = new XMLHttpRequest();
      request.open('GET', request_url, true);

      request.onload = function () {
        // see full list of possible response codes:
        // https://opencagedata.com/api#codes

        if (request.status == 200) {
          // Success!
          var data = JSON.parse(request.responseText);
          alert(data.results[0].formatted);
          const country = data.results[0].components.country;
          const city = data.results[0].components.city;
          const address = data.results[0].components.pedestrian;

        } else if (request.status <= 500) {
          // We reached our target server, but it returned an error

          console.log("unable to geocode! Response code: " + request.status);
          var data = JSON.parse(request.responseText);
          console.log(data.status.message);
        } else {
          console.log("server error");
        }
      };
      request.onerror = function () {
        // There was a connection error of some sort
        console.log("unable to connect to server");
      };

      request.send();  // make the request
      
    });

  }

  ngOnDestroy() {

  }

  // ngOnInit() {
  //   this.sub = this.route.params.subscribe(params => {
  //     this.id = +params['id']; // (+) converts string 'id' to a number
  //   });
  //   const benchUrl = `${environment.apiUrl}/benches/${this.id}`
  //   console.log(benchUrl);
  //   // this.http.get<BenchPage>(benchesUrl).subscribe(result => {
  //   //   console.log(`Benches loaded`, result);
  //   //   this.benches = result.data;
  //   // });
  // }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }

}
