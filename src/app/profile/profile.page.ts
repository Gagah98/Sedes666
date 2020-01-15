import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Bench } from '../models/bench';
import { BenchPage } from '../models/benchPage';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userId = this.auth.getUser()["source"]["source"]["_events"]["0"].user._id;
  username = this.auth.getUser()["source"]["source"]["_events"]["0"].user.username;
  benches: Bench[];
  constructor(private storage: Storage, private auth : AuthService,    public http: HttpClient ) { }
 
  ngOnInit() {
      const benchesUrl = `${environment.apiUrl}/benches`
      this.http.get<BenchPage>(benchesUrl).subscribe(result => {
      console.log(`Benches loaded`, result);
        this.benches = result.data.filter(data => data.userId == this.userId );
      console.log(this.benches);
    }); 
  }

  deleteBench(benchId){
    console.log(benchId)
    const benchesUrl = `${environment.apiUrl}/benches/`+benchId;
    this.http.delete(benchesUrl).subscribe(result => {
      console.log(`Benches deleted`, result);
  });

}
}


