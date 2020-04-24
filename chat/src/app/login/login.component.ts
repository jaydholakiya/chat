import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm = new FormGroup({
    Email : new FormControl('',Validators.required),
    Password : new FormControl('',Validators.required)
  });

  constructor( private auth : AuthService ) { }

  onLogin() {
    console.log('Signin button clicked...');
    console.log(this.loginForm.value);
    this.auth.signIn(this.loginForm.value.Email,this.loginForm.value.Password);
  }
  ngOnInit() {}

}
