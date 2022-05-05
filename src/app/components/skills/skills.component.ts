import { slideLeft} from 'src/app/animations/animations';
import { fade, fadeslow } from './../../animations/animations';
import { SkillService } from './../../services/skill.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../loading/loading.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  animations: [
    
    
    fade,
    fadeslow,
    slideLeft
    
  
  ]
})
export class SkillsComponent implements OnInit {

  constructor(private service: SkillService, 
              private authService: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
              ) { }

  skills: any = [];
  postOrPatch: boolean = false;
  editorCreate: boolean = false;
  load = false;


  ngOnInit(): void {
    this.dialog.open(LoadingComponent);
    this.service.getAll()
          .subscribe( skill => {
                this.skills = skill;
                if (skill) {
                  this.dialog.closeAll();
                  this.load = true;}
              });

    for (let skill in this.skills) {
      this.skills[skill].visible = true;
      this.skills[skill].editor = false;
      this.skills[skill].deleted = false;
    }
    this.editorCreate = false;
  }

  initDom():void {
    for (let skill in this.skills) {
      this.skills[skill].visible = true;
      this.skills[skill].editor = false;
      this.skills[skill].deleted = false;
  }

  }

  changeDom(id:any):void {
    for (let skill in this.skills) {
      if (this.skills[skill].skill_id === id) {
          this.skills[skill].editor= !this.skills[skill].editor;
          this.skills[skill].visible = !this.skills[skill].visible;
      }

  }
  }


  callEditorCreate() {
    this.postOrPatch = true;     //metodo que hace visible al editor solo en la tarjeta elegida
    this.editorCreate= !this.editorCreate;     

  }

  callEditorEdit(id:any) {
  
    this.postOrPatch = false;
 
    for (let skill in this.skills) {
 
        if (this.skills[skill].skill_id === id) {
            this.changeDom(id);
        }
      
  
    }
  

  }


  delSkill(id:any) {
    for (let skill in this.skills) {
      if (this.skills[skill].skill_id === id) {
        this.skills[skill].deleted = !this.skills[skill].deleted;
      }
    }
    this.service.delete(id).subscribe(() => {
     
        this.snackBar.open('Skill Eliminado', '', {
          duration: 3000
        });
      
    });
 
  }


  submitForm(form:any, id:any) {
  
    //cambia la visibilidad del dom
    for (let skill in this.skills) {
      if (this.skills[skill].skill_id === id) {
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
      data.skill_id = id;
      console.log(id);
     this.service.update(data, data.skill_id).subscribe(() => {
       this.ngOnInit();
     });
    }


  }


  //metodo que recupera el índice del array de objetos según la id
  indexGen(id:any): number {
    let index = 0;
    for (let skill in this.skills) {
      if (this.skills[skill].skill_id === id) {
        index = parseInt(skill);
      
      }
    }
    
    return index;
  }

  emptyChecker(form:any, id:any): any {
    
    //itera por todas las propiedades del obj form y si los valores son falsy, recupera el valor de la primera request
    
    for (let prop in form) {
      if (form[prop] === "" || form[prop] === undefined || form[prop] === null) {
        
        form[prop] = this.skills[id][prop];
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

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.skills, event.previousIndex, event.currentIndex);

  //   //TODO: modificar la id en base de datos para actualizar el orden

  //   // if (this.isAdmin()) {
  //   //   let index = event.currentIndex;
  //   //   let skill_id_mod = this.skills[index].skill_id; 
      
      
  //   //   if (index === 0) {
  //   //     this.skills[0].skill_id = this.skills[1].skill_id - 1; 
  //   //     let data_1 = this.skills[index];
  //   //     this.service.update(data_1, skill_id_mod).subscribe(() => {
  //   //       // this.service.delete(skill_id_mod).subscribe();
  //   //     });
  //   //   }
  //   //   else {
  //   //     let id_prev = this.skills[index-1].skill_id;
  //   //     if (skill_id_mod<id_prev) {

  //   //         this.skills[index].skill_id = id_prev +1;
  //   //         let skill_id_mod_2 = this.skills[index].skill_id; 

  //   //         // for (let skill in this.skills) {

  //   //         //   if (this.skills[skill].skill_id === skill_id_mod_2) {
  //   //         //     let id_prev = this.skills[skill].skill_id;
  //   //         //     this.skills[skill].skill_id += 1;
           
  //   //         //     let data = this.skills[skill];
  //   //         //     this.service.update(data, skill_id_mod).subscribe(() => {
  //   //         //   // this.service.delete(id_prev).subscribe();
             
  //   //         // });
            
  //   //         //    }

  //   //         // } 

  //   //     let data_1 = this.skills[index];
        
 
  //   //     this.service.update(data_1, skill_id_mod).subscribe(() => {
  //   //       this.service.delete(sk).subscribe();
  //   //       })
  //   //     }

  //   //   }
      
  //   // }
    
    
  // }









}
