import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../components/loading/loading.component';
import { PersonaService } from './persona.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  load = false;


  constructor(private dialog: MatDialog, 
    private service: PersonaService) { }


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
