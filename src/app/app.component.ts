
import { slideTop } from 'src/app/animations/animations';
import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideTop
  ]
})
export class AppComponent  {
  title = 'portfolio-v2';




}
