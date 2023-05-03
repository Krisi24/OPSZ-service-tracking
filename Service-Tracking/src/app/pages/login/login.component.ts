import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService  } from 'src/app/services/auth.service';

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

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.loginForm.get('email')?.value as string, this.loginForm.get('password')?.value as string).then( cred => {
      this.authService.isUserLoggedIn().subscribe(user => {
        this.loggedInUser = user;
        localStorage.setItem('user', JSON.stringify(this.loggedInUser));
        this.router.navigateByUrl("/service-tracking");
      }, error => {
        localStorage.setItem('user', JSON.stringify(null));
      });
    }).catch( error => {
      alert("Login is unsuccessful");
    });
    console.log("login");
  }

}
