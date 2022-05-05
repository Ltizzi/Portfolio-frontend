import { MaterialModule } from './common/material/material.module';
import { SkillService } from './services/skill.service';
import { ExpService } from './services/exp.service';
import { EduService } from './services/edu.service';
import { DataService } from './services/data.service';
import { PersonaService } from './services/persona.service';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ExpComponent } from './components/exp/exp.component';
import { EduComponent } from './components/edu/edu.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SkillsComponent } from './components/skills/skills.component';
import { AboutComponent } from './components/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { AppErrorHandler } from './common/app-error-handler';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { LoadingComponent } from './components/loading/loading.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AdminComponent } from './components/admin/admin.component';
import { MatNativeDateModule } from '@angular/material/core';
import { NoAccessComponent } from './components/no-access/no-access.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    ExpComponent,
    EduComponent,
    ProyectosComponent,
    FooterComponent,
    LoginComponent,
    SkillsComponent,
    AboutComponent,
    NotFoundComponent,
    LoadingComponent,
    ContactoComponent,
    AdminComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatNativeDateModule
    
  ],
  providers: [{provide: ErrorHandler, useClass: AppErrorHandler},
              PersonaService,
              DataService,
              EduService,
              ExpService,
              SkillService,
              { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
              JwtHelperService,
              AuthService  
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
