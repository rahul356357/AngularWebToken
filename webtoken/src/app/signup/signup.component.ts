import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
    moduleId: module.id,
    templateUrl: 'signup.component.html',
 styleUrls: ['./signup.component.css']

})

export class SignupComponent implements OnInit {
    model: any = {};
    loading = false;
    message = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset signup status
        this.authenticationService.logout();
    }

  
     signup() {

        this.authenticationService.signup(this.model.username, this.model.password)
            .subscribe((response:any)=>{
                console.log(response);
                if(response.success)
                {
                 console.log("inside response status");
                 this.loading=true;
                   this.message=response.message;
                // on successfull registration redirect onto to the signin route 
            }
            
            })
        
    }
}
