import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout().then( () => {
      localStorage.setItem('user', JSON.stringify(null));
      this.router.navigateByUrl("/login");
    }).catch( error => {
      console.log(error);
    });
  }
}
