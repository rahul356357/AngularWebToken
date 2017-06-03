import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;
   

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<any> {
        console.log(username, password);
        return this.http.post('http://localhost:3000/auth/authenticate', { email: username, password: password })
            .map((response: Response) => {

                console.log(response.json());
// if the login is failed then return the response as it is 
             if(!response.json().success)
             {
              return response.json();
             }   
             if(response.json().success){
                                 let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ email: username, token: token }));

                    // return true to indicate successful signup
                    return response.json();
                } else {
                return response.json();              
                }
        
             }
             })
            .catch((err:any)=>{
                console.log(err);
                return Observable.of(false);
            });
    }


 signup(username: string, password: string): Observable<any> {
        return this.http.post('http://localhost:3000/auth/register', { email: username, password: password })
            .map((response: Response) => {
           //return the response containing the success message from the database
                 return response.json();
         })
            .catch((err:any)=>{
         // return the response if email exists  in the database                
               return Observable.of({"success":'false',"message":"Email Already Exist"})
            });
    }




    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}