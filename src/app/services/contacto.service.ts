import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactoService extends DataService{

  constructor(http: HttpClient, authService: AuthService) {
    super("https://ltizzi-api-portfolio.herokuapp.com/contacto", http, authService);
   }
}
