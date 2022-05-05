import { ContactoService } from './../../services/contacto.service';
import { Component, OnInit } from '@angular/core';
import {  fade, fadeslow } from 'src/app/animations/animations';
import {  NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  animations: [
    fade,
    fadeslow    
  
  ]
})
export class ContactoComponent implements OnInit {

  constructor(private service: ContactoService,
              private snackBar: MatSnackBar) { }

  msgEnviado:boolean = false;

  ngOnInit(): void {
  }

  submitForm(form: NgForm) {
    let data = form.value;
    data.visto = false;
    this.service.create(data).subscribe(() => {
      form.reset();
    })
  }

  enviado() {
    this.snackBar.open('Mensaje enviado', '', {
      duration: 3000
    });
  }

  
 

}
