import { AuthService } from 'src/app/services/auth.service';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class PersonaService extends DataService{




  constructor(http: HttpClient, authService: AuthService) {
    super('https://ltizzi-api-portfolio.herokuapp.com/persona', http, authService);
  }




}
 