import { fadeReallySlow } from './../../animations/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonaService } from 'src/app/services/persona.service';
import { LoadingComponent } from '../loading/loading.component';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    fadeReallySlow
  ]
  
})
export class HeaderComponent implements OnInit {

  load = false;



  constructor(private dialog: MatDialog, 
    private service: PersonaService) { }

  ngOnInit(): void {
    this.loading();
    
  }

  loading() {
      this.dialog.open(LoadingComponent);
      
      this.service.get(4)
        .subscribe( (response:any) => {
          if (response) {
            this.dialog.closeAll();
            this.load = true;

          }
        })
          
   
    
  }

}
