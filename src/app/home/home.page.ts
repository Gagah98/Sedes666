import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

export interface HomePageTab {
  title: string; // The title of the tab in the tab bar
  icon: string; // The icon of the tab in the tab bar
  path: string; // The route's path of the tab to display
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  constructor( private auth: AuthService,
    private router: Router, public http: HttpClient) { 
   
  }
  

  ngOnInit() {
    this.getBenches();
  }

  getBenches(){
    const benchesUrl = `${environment.apiUrl}/benches`
  this.http.get(benchesUrl).subscribe(benches => {
    console.log(`Benches loaded`, benches);
  });
  }

  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

 


}

