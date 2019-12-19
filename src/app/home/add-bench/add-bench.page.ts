import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-add-bench',
  templateUrl: './add-bench.page.html',
  styleUrls: ['./add-bench.page.scss'],
})
export class AddBenchPage implements OnInit {

  constructor(
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
       this.geolocation.getCurrentPosition().then((position: Geoposition ) => {
           const coords = position.coords;
           console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
         }).catch(err => {
           console.warn(`Could not retrieve user position because: ${err.message}`);
         });
  }

}
