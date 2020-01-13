import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userId = null;
  username = null;
  constructor(private storage: Storage,    public http: HttpClient ) { }
 
  ngOnInit() {
    this.storage.get('user_id').then((val) => {
      this.userId=val;
    })
    this.storage.get('username').then((val) => {
      this.username=val;
    })

  }

}
