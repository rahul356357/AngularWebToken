import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import {AuthenticationService } from './authentication.service';
import {AuthGuard} from './authguard.service';
import {routing } from './app.routing';
import { LoginComponent } from './login/login.component'
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    LoginComponent,
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  routing
  ],
  providers: [ AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
