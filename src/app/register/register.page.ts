import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { AuthRequest } from '../models/auth-request';

@Component({
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   */
  authRequest: AuthRequest;

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  loginError: boolean;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.authRequest = new AuthRequest();
  }

  ngOnInit() {
  }

  /**
   * Called when the login form is submitted.
   */
  onSubmit(form: NgForm) {

    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    
    // Hide any previous login error.
    this.loginError = false;

    // Perform the authentication request to the API.
    this.auth.logIn(this.authRequest).subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
      error: err => {
        console.log(this.authRequest)
        this.loginError = true;
        console.warn(`Authentication failed: ${err.message}`);
      }
    });
  }
}