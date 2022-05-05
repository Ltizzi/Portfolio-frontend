import { MatSnackBar } from '@angular/material/snack-bar';
import { slideLeft } from 'src/app/animations/animations';
import { fade, fadeslow } from './../../animations/animations';
import { AuthService } from './../../services/auth.service';
import { EduService } from './../../services/edu.service';
import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-edu',
  templateUrl: './edu.component.html',
  styleUrls: ['./edu.component.css'],
  animations: [
    fade,
    fadeslow,
    slideLeft
  ]
})
export class EduComponent implements OnInit {

  constructor(private service: EduService, 
              private authService: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  certificaciones: any = [];   //array de datos recuperados de la db
  postOrPatch: boolean = false;   //variable binaria usada para elegir método post o patch
  editorCreate: boolean = false;
  load = false;                 //usada para cargar elementos en el dom solo si se recuperan datos de la db

  ngOnInit(): void {
    this.dialog.open(LoadingComponent);
    this.service.getAll()
        .subscribe( edu => {
              this.certificaciones = edu;
              if (edu) {
                this.dialog.closeAll();
                this.load = true;}
            
            
            });

         //loopea entre todos los trabajos y agrega las propiedades visible y editor, necesarias para el dom
    for (let cert in this.certificaciones) {
          this.certificaciones[cert].visible = true;
          this.certificaciones[cert].editor = false;
          this.certificaciones[cert].deleted = false;
         }
    this.editorCreate = false;
  }

  initDom():void {
    for (let cert in this.certificaciones) {
      this.certificaciones[cert].visible = true;
      this.certificaciones[cert].editor = false;
      this.certificaciones[cert].deleted = false;
  }

  }

  changeDom(id:any):void {
    for (let cert in this.certificaciones) {
      if (this.certificaciones[cert].edu_id === id) {
          this.certificaciones[cert].editor= !this.certificaciones[cert].editor;
          this.certificaciones[cert].visible = !this.certificaciones[cert].visible;
      }

  }
  }

  callEditorCreate() {

    this.postOrPatch = true;  //metodo que hace visible al editor solo en la tarjeta elegida
    this.editorCreate= !this.editorCreate; 
  }

  callEditorEdit(id:any) {
  
    this.postOrPatch = false;
 
    for (let cert in this.certificaciones) {
 
        if (this.certificaciones[cert].edu_id === id) {
            this.certificaciones[cert].editor= !this.certificaciones[cert].editor;
            this.certificaciones[cert].visible = !this.certificaciones[cert].visible;
        }
  
    }
  

  }

  delEdu(id:any) {
    for (let cert in this.certificaciones) {
      if (this.certificaciones[cert].edu_id === id) {
        this.certificaciones[cert].deleted = !this.certificaciones[cert].deleted;
      }
    }
    this.service.delete(id).subscribe(()=> {
      this.snackBar.open('Certificación Eliminada', '', {
        duration: 3000
      });
    
    });
 

  }


  submitForm(form:any, id:any) {
  
    //cambia la visibilidad del dom
    for (let cert in this.certificaciones) {
      if (this.certificaciones[cert].edu_id === id) {
        this.changeDom(id);
        }
    }
    
    
    // segun el booleano postOrPatch, elige el método create o update
    if (this.postOrPatch === true ) {
      let data = form.value;
      this.service.create(data).subscribe(() => {
        this.ngOnInit();
      });
      
    }
    else if (this.postOrPatch === false) {
      let data = this.emptyChecker(form.value, this.indexGen(id) )  //rellena los datos faltantes
      data.edu_id = id;
      console.log(data);
      this.service.update(data, data.edu_id).subscribe(() => {
        this.ngOnInit();
      });
      
    }

    

  }

  //metodo que recupera el índice del array de objetos según la id
  indexGen(id:any): number {
    let index = 0;
    for (let cert in this.certificaciones) {
      if (this.certificaciones[cert].edu_id === id) {
        index = parseInt(cert);
        
      }
    }
    
    return index;
  }

  emptyChecker(form:any, id:any): any {
    
    //itera por todas las propiedades del obj form y si los valores son falsy, recupera el valor de la primera request
    
    for (let prop in form) {
      if (form[prop] === "" || form[prop] === undefined || form[prop] === null) {
        
        form[prop] = this.certificaciones[id][prop];
       }
      else console.log(form.prop);
    }
 
    return form; 
  }


  isLogIn() {

    return this.authService.isLoggedIn();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }






}
