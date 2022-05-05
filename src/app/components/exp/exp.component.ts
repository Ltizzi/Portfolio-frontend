import { MatSnackBar } from '@angular/material/snack-bar';
import { slideLeft } from 'src/app/animations/animations';
import { fade, fadeslow } from './../../animations/animations';
import { AuthService } from './../../services/auth.service';
import { ExpService } from './../../services/exp.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-exp',
  templateUrl: './exp.component.html',
  styleUrls: ['./exp.component.css'],
  animations: [
    fade,
    fadeslow,
    slideLeft
  ]
})
export class ExpComponent implements OnInit {

  exps: any = [];
  postOrPatch: boolean = false;
  editorCreate: boolean = false;
  load = false;

  constructor(private service: ExpService, 
              private authService: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
              ) { }

  ngOnInit(): void {
    this.dialog.open(LoadingComponent);
    this.service.getAll()
        .subscribe( exp => {
            this.exps = exp;
            if (exp) {
              this.dialog.closeAll();
              this.load = true;}
          
          
          });
    
        //loopea entre todos los trabajos y agrega las propiedades visible y editor, necesarias para el dom
    for (let exp in this.exps) {
        this.exps[exp].visible = true;
        this.exps[exp].editor = false;
        this.exps[exp].deleted = false;
        this.editorCreate = false;
    }
    this.editorCreate = false;
  }

  initDom():void {
    for (let exp in this.exps) {
      this.exps[exp].visible = true;
      this.exps[exp].editor = false;
      this.exps[exp].deleted = false;
  }

  }

  changeDom(id:any):void {
    for (let xp in this.exps) {
      if (this.exps[xp].exp_id === id) {
          this.exps[xp].editor= !this.exps[xp].editor;
          this.exps[xp].visible = !this.exps[xp].visible;
      }

  }
  }


  callEditorCreate() {

      this.postOrPatch = true;
      this.editorCreate= !this.editorCreate;    

  }

  callEditorEdit(id:any) {
    this.postOrPatch = false; 
    for (let xp in this.exps) { 
        if (this.exps[xp].exp_id === id) {
            this.changeDom(id);
        }  
    }
  }

  delExp(id:any) {
    for (let xp in this.exps) {
      if (this.exps[xp].exp_id === id) {
        this.exps[xp].deleted = !this.exps[xp].deleted;
      }
    }
    this.service.delete(id).subscribe(()=> {
      this.snackBar.open('Trabajo Eliminado', '', {
        duration: 3000
      });
    
    });
 
    // location.reload();
  }

  submitForm(form:any, id:any) {  
    //cambia la visibilidad del dom
    for (let xp in this.exps) {
      if (this.exps[xp].exp_id === id) {
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
      data.exp_id = id;
      console.log(data);
      this.service.update(data, data.exp_id).subscribe(() => {
        this.ngOnInit();
      });
 
    }


  }

  //metodo que recupera el índice del array de objetos según la id
  indexGen(id:any): number {
    let index = 0;
    for (let xp in this.exps) {
      if (this.exps[xp].exp_id === id) {
        index = parseInt(xp);
        
      }
    }
    
    return index;
  }

  emptyChecker(form:any, id:any): any {
    
    //itera por todas las propiedades del obj form y si los valores son falsy, recupera el valor de la primera request
    
    for (let prop in form) {
      if (form[prop] === "" || form[prop] === undefined || form[prop] === null) {
        
        form[prop] = this.exps[id][prop];
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
