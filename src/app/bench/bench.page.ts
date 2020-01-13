import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Bench } from '../models/bench';

@Component({
  selector: 'app-bench',
  templateUrl: './bench.page.html',
  styleUrls: ['./bench.page.scss'],
})

export class BenchPage implements OnInit, OnDestroy {
  benchId: any;
  bench: Bench;
  benchAddress: any;
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

      // this.http.get(request_url).subscribe(result => {
      // Cette méthode aurait été plus propre mais "Blocage d’une requête multiorigines (Cross-Origin Request) : la politique « Same Origin » ne permet pas de consulter la ressource distante située sur https://api.opencagedata.com/geocode/v1/json?key=721eb9ce3ae…b672818b4eeb&q=52.37366%2C4.896888&pretty=1&no_annotations=1.  Raison : jeton « authorization » manquant dans l’en-tête CORS « Access-Control-Allow-Headers » du canal de pré-vérification des requêtes CORS."

      var request = new XMLHttpRequest();
      request.open('GET', request_url, true);

      request.onload = () => {
        // see full list of possible response codes:
        // https://opencagedata.com/api#codes

        if (request.status == 200) {
          // Success!
          var data = JSON.parse(request.responseText);
          this.benchAddress = data.results[0].formatted
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

}
