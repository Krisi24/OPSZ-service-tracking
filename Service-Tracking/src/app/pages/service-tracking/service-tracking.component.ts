import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-service-tracking',
  templateUrl: './service-tracking.component.html',
  styleUrls: ['./service-tracking.component.scss']
})
export class ServiceTrackingComponent implements OnInit {

  user: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getLoggedUser( JSON.parse(localStorage.getItem('user') as string).email).subscribe( (res: any) => {
      this.user = {
        name: res[0].name
      }
    });
  }

}
