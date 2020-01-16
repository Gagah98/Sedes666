import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Bench } from '../models/bench';
import { VoteRequest } from '../models/vote-request'
import {User} from "../models/user";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-bench',
  templateUrl: './bench.page.html',
  styleUrls: ['./bench.page.scss'],
})

export class BenchPage implements OnInit {
  benchId: any;
  bench: Bench;
  benchAddress: any;
  data: any;
  voteRequest : VoteRequest;
  user: User;
  userId = this.auth.getUser()["source"]["source"]["_events"]["0"].user._id;
  voteType : string;
  constructor(
    private route: ActivatedRoute,
    public http: HttpClient,
    private auth : AuthService,
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

      var api_url = environment.geocodeApi + '/geocode/v1/json'

      var request_url = api_url
        + '?'
        + 'key=' + apikey
        + '&q=' + encodeURIComponent(latitude + ',' + longitude)
        + '&pretty=1'
        + '&no_annotations=1';

      this.http.get(request_url).subscribe((result: any) => {
        this.benchAddress = result.results[0].formatted;
        console.log(this.benchAddress);
      });

    });

  }
  scoreUp(){
    const voteUrl = `/votes`
    this.voteType = "true";
    this.voteRequest.type = this.voteType; 
    this.voteRequest.userId = this.userId;
    this.voteRequest.benchId = this.benchId;
    this.http.post(voteUrl,this.voteRequest).subscribe(result => {
      console.log(`Upvoted`, result);  
  }
    )}
  scoreDown(){
    const voteUrl = `/votes`
    this.voteType = "false";
    this.voteRequest.type = this.voteType; 
    this.voteRequest.userId = this.userId;
    this.voteRequest.benchId = this.benchId;
    this.http.post(voteUrl,this.voteRequest).subscribe(result => {
      console.log(`Upvoted`, result);  
  }

    )}}
