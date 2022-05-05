import { AuthService } from 'src/app/services/auth.service';
import { BadRequestError } from './../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable()
export class DataService {

  
  constructor(@Inject(String) private url:string, private http: HttpClient, private authService: AuthService) { }

  token = this.authService.token;
  header = new HttpHeaders({

    'Authorization': 'Bearer '+ this.token,
    'Content-Type' : "application/json"
   

  });


  getAll() {
    return this.http.get(this.url + '/ver')
    .pipe(map(response => response),
          catchError(this.handleError));
  }

  get(id: number) {
    return this.http.get(this.url + '/buscar?id=' + id)
      .pipe(map(response => response),
          catchError(this.handleError));
  }

//un get con token debido al acceso irrestricto a la sección admin

  getContacts() {
    return this.http.get(this.url + '/ver', {headers: this.header})
        .pipe(map(response => response), 
        catchError(this.handleError));
  }
 
  create(resource:any ) {

    return   this.http.post(this.url + '/new', resource, { headers: this.header })
              .pipe(map(response => response),
                    catchError(this.handleError));
  }

  update(resource:any, id: number) {
   
    return this.http.patch(this.url + '/edit?id=' + id, resource, { headers: this.header })
      .pipe(map(response => response),
            catchError(this.handleError));
  }

  delete(id: number) { 


    return this.http.delete(this.url + '/delete?id=' + id, { headers: this.header })
      .pipe(map(response => response),
            catchError(this.handleError));         

      }
  

  private handleError (error: Response) {
    if (error.status === 404) {
      return throwError(() => new NotFoundError())}
    else if (error.status === 400) {
      return throwError(() => new BadRequestError(error))
    }
    else 
      return throwError(() => new AppError(error));

  }


}
 