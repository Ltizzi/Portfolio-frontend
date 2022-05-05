import { LoginComponent } from './../login/login.component';
import { AuthService } from './../../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { slideTop } from 'src/app/animations/animations';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  animations: [
    slideTop
  ]

})
export class NavBarComponent implements OnInit {
  
  persona:any = [];
  load = false;



  constructor(private service: PersonaService, 
              private authService: AuthService, 
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog)  { 
            
               }

  ngOnInit(): void {
    this.service.get(4)
    .subscribe( persona => {
          this.persona = persona;
          this.load = true;
        });
  }

  isLogIn() {

    return this.authService.isLoggedIn();
  }

  logOut() {
    
    this.authService.logout();
 
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  openDialog() {
    this.dialog.open(LoginComponent);
  }

  isExpired() {
    return this.authService.isTokenExpired;
  }
}
