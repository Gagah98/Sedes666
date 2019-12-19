import { Component, OnInit } from '@angular/core';

import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-map-bench',
  templateUrl: './map-bench.page.html',
  styleUrls: ['./map-bench.page.scss'],
})
export class MapBenchPage implements OnInit {

  constructor(
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((position: Geoposition) => {
      const coords = position.coords;
      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });
    const trackingSubscription = this.geolocation.watchPosition().subscribe({
      next: (position: Geoposition) => {
        const coords = position.coords;
        console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
      },
      error: err => {
        console.warn(`Could not retrieve user position because: ${err.message}`);
      }
    }); 
  }

}
