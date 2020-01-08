import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { latLng, MapOptions, tileLayer, Map } from 'leaflet';

@Component({
  selector: 'app-add-bench',
  templateUrl: './add-bench.page.html',
  styleUrls: ['./add-bench.page.scss'],
})
export class AddBenchPage implements OnInit {

  mapOptions: MapOptions;

  constructor(
    private geolocation: Geolocation
  ) {
    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 19 }
        )
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
  }
  
  ngOnInit() {
       this.geolocation.getCurrentPosition().then((position: Geoposition ) => {
           const coords = position.coords;
           console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
         }).catch(err => {
           console.warn(`Could not retrieve user position because: ${err.message}`);
         });
  };

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);

    // wrap map.locate in a function    
    function locate() {
      map.locate({setView: true, maxZoom: 19});
    }

    // call locate every 3 seconds... forever
    setInterval(locate, 3000);

  };

  logRatingChange(rating){
        console.log("changed rating: ",rating);
        // do your stuff
    }

}
