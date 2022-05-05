import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class EduService extends DataService{

  constructor(http: HttpClient, authService: AuthService) { 
    super("https://ltizzi-api-portfolio.herokuapp.com/edu", http, authService);
  }
}