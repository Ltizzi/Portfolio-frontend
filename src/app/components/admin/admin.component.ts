import { MatSnackBar } from '@angular/material/snack-bar';
import { fade } from 'src/app/animations/animations';
import { LoadingComponent } from './../loading/loading.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ContactoService } from './../../services/contacto.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    fade
  ]
})
export class AdminComponent implements OnInit {

  constructor(private contServ: ContactoService,
              private authServ: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  contactos: any = [];
  load = false;

  //componente usado para la carga de mensajes de la sección contacto solo visto por el admin

  ngOnInit(): void {
    this.dialog.open(LoadingComponent);
    this.contServ.getContacts()
            .subscribe( contacto => {
              this.contactos = contacto;
              if (contacto) {
                this.dialog.closeAll();
                this.load = true;
              for (let contact in this.contactos) {
                  this.contactos[contact].deleted = false;
                }
              }
            });
    
  }

  isLog() {
    this.authServ.isLoggedIn;
  }

  deleteContact(id:any) {
    
    
    for (let i= 0; i < this.contactos.length; i++) {
      
      if (this.contactos[i].contacto_id === id) {
        this.contactos[i].deleted = !this.contactos[i].deleted;
      }
    }
    this.contServ.delete(id).subscribe(() => {
      this.snackBar.open('Mensaje Eliminado', '', {
        duration: 3000
      });
    
    });
  }

  marcarVisto(id:any) {

    //utilizado para mantener un registro de los mensajes ya visualizados 
    
    for (let contact in this.contactos) {
      if (this.contactos[contact].contacto_id === id) {
        this.contactos[contact].visto = !this.contactos[contact].visto;
        console.log(contact);
      }
    }
    let data = this.contactos[this.indexGen(id)];
    console.log(data);
    this.contServ.update(data, id).subscribe();    
    
  }


  indexGen(id:any): number {

    //usado para simplificar el método update, recupera el indice del objeto en el array de mensajes

    let index = 0;
  
    
      for (let contact in this.contactos) {
        if (this.contactos[contact].contacto_id === id) {
          index = parseInt(contact);
        }
      }
    
    
    return index;
  }


}
