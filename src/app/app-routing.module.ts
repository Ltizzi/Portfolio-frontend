import { NoAccessComponent } from './components/no-access/no-access.component';
import { AdminGuard } from './services/admin.guard';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExpComponent } from './components/exp/exp.component';
import { EduComponent } from './components/edu/edu.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'skills',
    component: SkillsComponent

  },
  {
    path:'edu',
    component: EduComponent
  },
  {
    path: 'exp',
    component: ExpComponent
  },
  {
    path:'admin',
    component: AdminComponent, canActivate: [AdminGuard]
  },
  {
    path:'contacto',
    component: ContactoComponent
  },
  {
    path:'no-access',
    component: NoAccessComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
  

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
