import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService  } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  
  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl('')
  });
  
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("reg");
    this.auth.signup(this.signUpForm.get('email')?.value as string, this.signUpForm.get('password')?.value as string).then( cred => {
      this.router.navigateByUrl("/login");
      console.log("successfull registration");
    }).catch(error => {
      console.log(error);
    });
  }

}
