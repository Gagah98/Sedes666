import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Bench } from '../models/bench';
import { BenchPage } from '../models/benchPage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userId = null;
  username = null;
  benches: Bench[];
  constructor(private storage: Storage,    public http: HttpClient ) { }
 
  ngOnInit() {
    this.storage.get('user_id').then((val) => {
      this.userId=val;
    })
    this.storage.get('username').then((val) => {
      this.username=val;
    })

      const benchesUrl = `${environment.apiUrl}/benches`
    this.http.get<BenchPage>(benchesUrl).subscribe(result => {
      console.log(`Benches loaded`, result);
    this.benches = result.data.filter(data => data.userId = this.userId );
      console.log(this.benches);
    });
  }

  deleteBench(benchId){
    console.log(benchId)
    const benchesUrl = `${environment.apiUrl}/benches/`+benchId;
    this.http.delete(benchesUrl).subscribe(result => {
      console.log(`Benches deleted`, result);
      location.reload();
  })
}
}


