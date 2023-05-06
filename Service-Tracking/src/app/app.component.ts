import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Service-Tracking';
  loggedInUser?: firebase.default.User | null;

  registration: any;
  new_user: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor( private bar: MatSnackBar){}

  ngOnInit(): void {

  }

  newUser(event: any){
    this.new_user = {
      email: event.email
    }
    this.bar.open('Successful registration with ' + event.email + " email!", 'close',{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2500
    });
  }
}
