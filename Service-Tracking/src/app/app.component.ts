import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Service-Tracking';
  loggedInUser?: firebase.default.User | null;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    
  }
}
