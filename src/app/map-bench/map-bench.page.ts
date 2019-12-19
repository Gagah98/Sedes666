import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'

import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

import { latLng, MapOptions, tileLayer, marker, Marker } from 'leaflet';

import { defaultIcon } from '../icon/default-marker';

import { Bench } from '../models/bench';
import { BenchPage } from '../models/benchPage';

@Component({
  selector: 'app-map-bench',
  templateUrl: './map-bench.page.html',
  styleUrls: ['./map-bench.page.scss'],
})
export class MapBenchPage implements OnInit {
  mapOptions: MapOptions;
  
  mapMarkers: Marker[];

  benches: Bench[];


  constructor(
    private geolocation: Geolocation, private auth: AuthService,
    private router: Router, public http: HttpClient
  ) { 

    this.mapMarkers = [
      marker([ 46.778186, 6.641524 ], { icon: defaultIcon }).bindTooltip('Hello'),
      marker([ 46.780796, 6.647395 ], { icon: defaultIcon }),
      marker([ 46.784992, 6.652267 ], { icon: defaultIcon })
    ];

    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
  }

  onMapReady(map: L.Map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
 }

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

  ionViewDidLoad(){
    const benchesUrl = `${environment.apiUrl}/benches`
  this.http.get<BenchPage>(benchesUrl).subscribe(result => {
    console.log(`Benches loaded`, result);
    this.benches = result.data;
  });
  }

  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }


}
