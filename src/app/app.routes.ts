import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AdminComponent } from './pages/admin/admin.component';
import { adminGuard } from './core/guards/auth.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'aboutMe', component: AboutMeComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'projects', component: ProjectsComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistroComponent },
    { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
];
