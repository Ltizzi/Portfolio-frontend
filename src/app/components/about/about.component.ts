import { zoomInDown, slideRight, fade } from './../../animations/animations';
import { AuthService } from './../../services/auth.service';
import { PersonaService } from './../../services/persona.service';
import { Component, OnInit } from '@angular/core';
import { slideLeft } from 'src/app/animations/animations';
import { trigger, transition, query, animateChild } from '@angular/animations';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('aboutAnimation', [
      transition(':enter', [
        query('@zoomInDown', animateChild()),
        query('@slideLeft', animateChild()),
        query('@slideRight', animateChild())       
       
    ])
    ]),
    slideLeft,
    zoomInDown,
    slideRight,
    fade
  ]
  
})
export class AboutComponent implements OnInit {

  persona: any = [];   //array con la información de la DB
  editor: boolean = false;  //variable usada para activar la visualización del editor
  form: any = [];


  constructor(private service: PersonaService, private authService: AuthService) { }

  ngOnInit(): void {
    this.service.get(4)
        .subscribe( persona => this.persona = persona);
  }

  callEditor() {
    this.editor= !this.editor;
  }


  emptyChecker(form:any): any {
    //usado en principio porque se cargaban las variables no editadas como null
    //itera por todas las propiedades del obj form y si los valores son falsy, recupera el valor de la primera request

    for (let prop in form) {
      if (form[prop] === "" || form[prop] === undefined || form[prop] === null) {
        form[prop] = this.persona[prop];
       }
      else console.log(form.prop);
    }
 
    return form; 
  }

  submitEdit(form:any) {
    
    this.editor= !this.editor;

    
    //pasa el form por un método que si el formulario no manda un valor, lo recupera de la base de la primer request
     let data = this.emptyChecker(form.value);
     data.persona_id = this.persona.persona_id;  //hardcodea la id
    
    
    //pasa la data editada
    this.service.update(data, data.persona_id).subscribe(() => {
      this.ngOnInit();
    });


  }

  isLogIn() {

    return this.authService.isLoggedIn();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
  

}
