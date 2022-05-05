import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectService extends DataService{

  constructor(http: HttpClient, authService: AuthService) { 
    super("https://ltizzi-api-portfolio.herokuapp.com/proyecto", http, authService);
  }
}
