import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User'
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User | null = null;

  constructor(private router: Router,private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getLoggedUser( JSON.parse(localStorage.getItem('user') as string).email).subscribe( (res: any) => {
      this.user = {
        name: res[0].name,
        email: res[0].email,
        serviceID: res[0].serviceID
      }
    });
  } 

}
