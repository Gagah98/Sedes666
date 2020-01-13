import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Geolocation, Geoposition} from "@ionic-native/geolocation/ngx";
import {latLng, MapOptions, tileLayer, Map} from "leaflet";
import {Crop} from "@ionic-native/crop/ngx";
import {ImagePicker} from "@ionic-native/image-picker/ngx";
import {FileTransfer, FileUploadOptions, FileTransferObject} from "@ionic-native/file-transfer/ngx";
import {QimgImage} from "../models/qimg-image";
import {Camera, CameraOptions} from "@ionic-native/camera/ngx";
import {PictureService} from "../services/picture/picture.service";

import {BenchRequest} from "../models/bench-request";
import {AddBenchService} from "./add-bench.service";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {Coordinate} from "../models/coordinate";
import {Location} from "../models/location";

@Component({selector: "app-add-bench", templateUrl: "./add-bench.page.html", styleUrls: ["./add-bench.page.scss"]})
export class AddBenchPage implements OnInit {
  mapOptions: MapOptions;
  fileUrl: any = null;
  respData: any;
  results: any;
  image: string;
  pictureData: string;
  picture: QimgImage;

  benchRequest: BenchRequest;
  addBenchError: boolean;

  locations: Location;
  coordinates: Coordinate[];

  constructor(private geolocation : Geolocation, private imagePicker : ImagePicker, private crop : Crop, private transfer : FileTransfer, private camera : Camera, private pictureService : PictureService, private addBenchService : AddBenchService, private router : Router, private auth : AuthService) {
    this.benchRequest = new BenchRequest();

    this.mapOptions = {
      layers: [tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {maxZoom: 19})],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
  }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((position : Geoposition) => {
      const coords = position.coords;
      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });

    const trackingSubscription = this.geolocation.watchPosition().subscribe({
      next: (position : Geoposition) => {
        const coords = position.coords;
        console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
        this.mapOptions.center = latLng(coords.latitude, coords.longitude);
      },
      error: err => {
        console.warn(`Could not retrieve user position because: ${err.message}`);
      }
    });
  }

  onMapReady(map : Map) {
    setTimeout(() => map.invalidateSize(), 0);

    // wrap map.locate in a function
    function locate() {
      map.locate({setView: true, maxZoom: 19});
    }

    // call locate every 3 seconds... forever
    setInterval(locate, 3000);
  }

  selected() {}

  logRatingChange(rating) {
    console.log("changed rating: ", rating);
    // do your stuff
  }

  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picture = picture;
    }, err => {
      console.warn("Could not take picture", err);
    });
  }

  onSubmit(form : NgForm) {

    event.preventDefault();
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    this.addBenchError = false;


    this.benchRequest.image = (!this.picture) ? "../../assets/img/logo-sedes.png" : this.picture.url;
    this.benchRequest.userId = "5e15c7103df0b90017551a31";
    this.locations = {
      type:"Point",
      coordinates: [52.37366, 4.896888]
    };
    this.benchRequest.location = this.locations;

    this.addBenchService.postBench(this.benchRequest).pipe(first()).subscribe({
      next: () => {
        this.router.navigateByUrl("/home");
      },
      error: err => {
        console.log(this.benchRequest);
        this.addBenchError = true;
        console.warn(`The bench couldn't be added ${err.message}`);
      }
    });
  }
}
