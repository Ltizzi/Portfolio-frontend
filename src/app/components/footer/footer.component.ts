import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  persona:any = [];

  constructor(private service: PersonaService) { }

  ngOnInit(): void {
    this.service.get(4)
    .subscribe( persona => this.persona = persona);
  }

}
