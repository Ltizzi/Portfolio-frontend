import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSubject: BehaviorSubject<any>;

  private headers = new HttpHeaders({

      'Content-Type': 'application/x-www-form-urlencoded',
       Accept: '*/*'
  });

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
    console.log("El servicio de autenticación está corriendo");
    this.currentUserSubject=
          new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('token')|| '{}'))

   }

   login(credentials:any): Observable<any> {
      const body = new HttpParams({fromObject: credentials});
      const options = { headers: this.headers};
    return this.http.post('https://ltizzi-api-portfolio.herokuapp.com/api/login', body.toString(), options)
        .pipe(map((data: any) => {
            if (data) {
              sessionStorage.setItem('token', JSON.stringify(data));
              this.currentUserSubject.next(data);
              return true;
            }
            return false;

        }));
   }

   logout() {
      sessionStorage.removeItem('token');
  }

    isLoggedIn() {
      if (sessionStorage.getItem('token') != null && this.jwtHelper.isTokenExpired()) 
        return true;
      else return false;
  
    }

    get currentUser() {
      if (sessionStorage.getItem('token') != null)
        return this.jwtHelper.decodeToken(this.currentUserSubject.value);
      else return null;
    }

    get token() {

      return this.currentUserSubject.value;
    }

    isAdmin() {
      if (sessionStorage.getItem('token') != null && this.currentUser.roles[0] === "ROLE_ADMIN") return true;
      else return false;


    }

    isTokenExpired() {
      return this.jwtHelper.isTokenExpired();
    }

  





}
