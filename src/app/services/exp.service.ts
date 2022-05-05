import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpService extends DataService{


  constructor(http: HttpClient, authService: AuthService) { 
    super("https://ltizzi-api-portfolio.herokuapp.com/exp", http, authService);
  }

  
}
