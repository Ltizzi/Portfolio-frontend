import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeReallySlow, zoomInDown } from './../../animations/animations';

import { Component, OnInit } from '@angular/core';
import { fade, fadeslow, slideLeft } from 'src/app/animations/animations';

import { AuthService } from 'src/app/services/auth.service';
import { ProyectService } from 'src/app/services/proyect.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
  animations: [
    
    
    fade,
    fadeslow,
    slideLeft,
    fadeReallySlow,
    zoomInDown
  
  ]
 
})
export class ProyectosComponent implements OnInit {


  proyectos: any = [];
  postOrPatch: boolean = false;
  editorCreate: boolean = false;

  constructor(private service: ProyectService, 
              private authService: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.service.getAll()
        .subscribe( proy => this.proyectos = proy)
    
        //loopea entre todos los proyectos y agrega las propiedades visible y editor, necesarias para el dom
    for (let proy in this.proyectos) {
        this.proyectos[proy].visible = true;
        this.proyectos[proy].editor = false;
        this.proyectos[proy].deleted = false;        
    }
    this.editorCreate = false;
  }

  initDom():void {
    for (let proy in this.proyectos) {
      this.proyectos[proy].visible = true;
      this.proyectos[proy].editor = false;
      this.proyectos[proy].deleted = false;
  }

  }

  changeDom(id:any):void {
    for (let proy in this.proyectos) {
      if (this.proyectos[proy].proyecto_id === id) {
          this.proyectos[proy].editor= !this.proyectos[proy].editor;
          this.proyectos[proy].visible = !this.proyectos[proy].visible;
      }

  }
  }


  callEditorCreate() {

      this.postOrPatch = true;
      this.editorCreate= !this.editorCreate;    

  }

  callEditorEdit(id:any) {
    this.postOrPatch = false; 
    for (let proy in this.proyectos) { 
        if (this.proyectos[proy].proyecto_id === id) {
            this.changeDom(id);
        }  
    }
  }

  delProyecto(id:any) {
    for (let proy in this.proyectos) {
      if (this.proyectos[proy].proyecto_id === id) {
        this.proyectos[proy].deleted = !this.proyectos[proy].deleted;
      }
    }
    this.service.delete(id).subscribe(()=> {
      this.snackBar.open('Proyecto Eliminado', '', {
        duration: 3000
      });
    
    });

  }

  submitForm(form:any, id:any) {  
    //cambia la visibilidad del dom
    for (let proy in this.proyectos) {
      if (this.proyectos[proy].proyecto_id === id) {
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
      data.proyecto_id = id;
      console.log(data);
      this.service.update(data, data.proyecto_id).subscribe(() => {
        this.ngOnInit();
      });
    }


  }

  //metodo que recupera el índice del array de objetos según la id
  indexGen(id:any): number {
    let index = 0;
    for (let proy in this.proyectos) {
      if (this.proyectos[proy].proyecto_id === id) {
        index = parseInt(proy);
        
      }
    }
    
    return index;
  }

  emptyChecker(form:any, id:any): any {
    
    //itera por todas las propiedades del obj form y si los valores son falsy, recupera el valor de la primera request
    
    for (let prop in form) {
      if (form[prop] === "" || form[prop] === undefined || form[prop] === null) {
        
        form[prop] = this.proyectos[id][prop];
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



