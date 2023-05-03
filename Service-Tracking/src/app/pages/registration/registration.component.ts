import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService  } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  
  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl('')
  });

  hide: boolean = true;
  
  constructor(private router: Router, private auth: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("reg");
    this.auth.signup(this.signUpForm.get('email')?.value as string, this.signUpForm.get('password')?.value as string).then( cred => {
      this.router.navigateByUrl("/login");

      const user = {
        name: this.signUpForm.get('name')?.value as string,
        email: this.signUpForm.get('email')?.value as string,
        serviceID: (Math.floor(Math.random() * 99999999) + 10000000).toString(),
      }
      this.userService.create(user).then( () => {
        // TODO...
      }).catch(error => {
        // console.log(error);
      });
    }).catch(error => {
      // console.log(error);
    });
  }

}
