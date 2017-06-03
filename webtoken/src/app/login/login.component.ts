import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    message = '';
  constructor(private authenticationService :AuthenticationService , private router:Router) { }

  ngOnInit() {
  }

   login() {
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(response => {
                console.log(response.success);
                if(!response.success){
                this.loading= !response.success;
                this.message= response.message;
                }
             if(response.success){
            this.router.navigate(['/home']);      
               }
             });
     }


}
