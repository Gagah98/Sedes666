import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";

//import { AuthService } from '../auth/auth.service';
import { RegisterRequest } from '../models/register-request';
import { RegisterService } from './register.service'

import {User} from "../models/user";
import {UserPage} from "../models/userPage";

import {environment} from "src/environments/environment";


/**
 * register page.
 */
@Component({
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss']
})
export class RegisterPage implements OnInit {

  /**
   * This authentication request object will be updated when the user
   * edits the register form. It will then be sent to the API.
   */
  registerRequest: RegisterRequest;

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  registerError: boolean;

  users: User[];
  usernames: string[]

  constructor(
    private registerService: RegisterService,
    private router: Router,
    public http : HttpClient
  ) {
    this.registerRequest = new RegisterRequest();
  }

  ngOnInit(){
    const usersUrl = `${environment.apiUrl}/users`;
    this.usernames = []
    this.http.get<UserPage>(usersUrl).subscribe(result => {
      console.log(`Users loaded`, result);
      this.users = result.data;

      console.log(this.users)

      for (let user of this.users) {

        this.usernames.push(user.username)
      }

  })

  console.log(this.usernames)
}

  /**
   * Called when the register form is submitted.
   */
  onSubmit(form: NgForm) {

    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    
    // Hide any previous register error.
    this.registerError = false;

    // Perform the registration + authentification request to the API.
    this.registerService.register(this.registerRequest)
    .pipe(first())
    .subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
      error: err => {
        console.log(this.registerRequest)
        this.registerError = true;
        console.warn(`Register failed: ${err.message}`);
      }
    });
  }
}