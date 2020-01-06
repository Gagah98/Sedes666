import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { latLng, MapOptions, tileLayer, Map } from 'leaflet';
import { Crop } from '@ionic-native/crop/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { QimpService } from './../qimp/qimp.service'

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

  constructor(
    private qimpService: QimpService,
    private geolocation: Geolocation,
    private imagePicker: ImagePicker,
    private crop: Crop,
    private transfer: FileTransfer
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

  cropUpload() {
      this.imagePicker.getPictures({ maximumImagesCount: 1, outputType: 0 }).then((results) => {
        for (let i = 0; i < results.length; i++) {
            console.log('Image URI: ' + results[i]);
            this.crop.crop(results[i], { quality: 100 })
              .then(
                newImage => {
                  console.log('new image path is: ' + newImage);
                  const fileTransfer: FileTransferObject = this.transfer.create();
                  const uploadOpts: FileUploadOptions = {
                     fileKey: 'file',
                     fileName: newImage.substr(newImage.lastIndexOf('/') + 1)
                  };
    
                  fileTransfer.upload(newImage, 'http://192.168.0.7:3000/api/upload', uploadOpts)
                   .then((data) => {
                     console.log(data);
                     this.respData = JSON.parse(data.response);
                     console.log(this.respData);
                     this.fileUrl = this.respData.fileUrl;
                   }, (err) => {
                     console.log(err);
                   });
                },
                error => console.error('Error cropping image', error)
              );
        }
      }, (err) => { console.log(err); });
       }};/*
      this.qimpService.postImages(newImage).subscribe((response) => {
        console.log(response);
      this.results = response;
   
  })}})}};*/
    


  // addImage(image){
  //   this.qimpService.postImages(image).subscribe((response) => {
  //     console.log(response);
  //     this.results = response;
  //   });
  // }}

  