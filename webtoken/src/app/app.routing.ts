import {SignupComponent} from './signup/signup.component';
import{ HomeComponent }from './home/home.component';
import {LoginComponent} from './login/login.component'
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {AuthGuard} from './authguard.service';
const appRoutes: Routes = [
    { path: '', component: SignupComponent },
    {path:'login', component:LoginComponent},
    { path:'home', component: HomeComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);