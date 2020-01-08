import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { latLng, MapOptions, tileLayer, Map } from 'leaflet';
import { Crop } from '@ionic-native/crop/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { QimgImage } from '../models/qimg-image';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-bench',
  templateUrl: './add-bench.page.html',
  styleUrls: ['./add-bench.page.scss'],
})
export class AddBenchPage implements OnInit {

  mapOptions: MapOptions;
  fileUrl: any = null;
  respData: any;
  results: any;
  image: string;
  pictureData: string;

  constructor(
    private geolocation: Geolocation,
    private imagePicker: ImagePicker,
    private crop: Crop,
    private transfer: FileTransfer,
    private camera: Camera
  ) {

    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 19 }
        )
      ],
      zoom: 19,
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
    
    takePicture() {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
      this.camera.getPicture(options).then(pictureData => {
        this.pictureData = pictureData;
      }).catch(err => {
        console.warn(`Could not take picture because: ${err.message}`);
      });
    }
  
};