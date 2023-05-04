import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService  } from 'src/app/services/auth.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggedInUser?: firebase.default.User | null;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  hide: boolean = true;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private router: Router, private authService: AuthService, private _errorBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.loginForm.get('email')?.value as string, this.loginForm.get('password')?.value as string).then( cred => {
      this.authService.isUserLoggedIn().subscribe(user => {
        this.loggedInUser = user;
        localStorage.setItem('user', JSON.stringify(this.loggedInUser));
         this.router.navigateByUrl("service-tracking");
      }, error => {
        localStorage.setItem('user', JSON.stringify(null));
        this._errorBar.open(error, 'close',{
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2500
        });
      });
    }).catch( error => {
      this._errorBar.open(error, 'close',{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2500
      });
    });
  }

}
