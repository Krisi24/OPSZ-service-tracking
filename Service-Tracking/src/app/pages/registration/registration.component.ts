import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService  } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements  OnInit {

  users: any;
  
  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  hide: boolean = true;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  constructor(private router: Router, private auth: AuthService, private userService: UserService, private _errorBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe( (res: any) => {
      this.users = res;
    });
  }

  onSubmit(): void {
    
    if(this.signUpForm.controls.name.getError('required') ||
      this.signUpForm.controls.email.getError('required') || 
      this.signUpForm.controls.password.getError('required') ||
      this.signUpForm.controls.rePassword.getError('required')
    ){
      this.errorMessage('All fields must be filled!');
      return;
    }
    if (this.signUpForm.controls.email.getError('email')){
      this.errorMessage('This is not a valid email!');
      return;
    }
    if (this.signUpForm.controls.name.getError('minlength')){
      this.errorMessage('Name field must be at least 3 character long!');
      return;
    }
    if (this.signUpForm.controls.password.getError('minlength') || this.signUpForm.controls.rePassword.getError('minLength') ){
      this.errorMessage('Password must be at least 6 character long!');
      return;
    }
    if (this.signUpForm.controls.password.value !== this.signUpForm.controls.rePassword.value ){
      this.errorMessage('Passwords are not matching!');
      return;
    }
    this.users.forEach( (user: any) => {
      if(user.email === this.signUpForm.controls.email.value){
        this.errorMessage('Email already in use!');
        return;
      }
    });

    if(this.signUpForm.valid) {
      this.auth.signup(this.signUpForm.get('email')?.value as string, this.signUpForm.get('password')?.value as string).then( cred => {
        const user = {
          name: this.signUpForm.get('name')?.value as string,
          email: this.signUpForm.get('email')?.value as string,
          serviceID: (Math.floor(Math.random() * 99999999) + 10000000).toString(),
        }
        this.userService.create(user).then( () => {
          this.router.navigateByUrl("/login");
        }).catch(error => {
          this.errorMessage('Registration is unsuccessful!');
        });
      }).catch(error => {
        // console.log(error);
        this.errorMessage(error);
      });
    }
  }

  errorMessage(errorMessage: string){
    this._errorBar.open(errorMessage, 'close',{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2500
    });
  }

}
