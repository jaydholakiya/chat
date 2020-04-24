import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user;
  selectedFile: any;
  profilePic: any;
  index = 0;

  constructor( private auth : AuthService,
    private router : Router,
    private db : AngularFireDatabase ) { }

  registerForm = new FormGroup({
    firstName : new FormControl('',Validators.required),
    lastName : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
    profilePic : new FormControl('',Validators.required)
  })

  

  databaseSave() {
    // this.db.database.ref('data').push({
    //   name:'Jay',
    //   age:'18',
    //   gender:'male'
    // });
    // this.db.database.ref('data/gender').push({
    //   likes:'989',
    //   disLikes:'18',
    //   canShare:'true'
    // });
    // this.db.database.ref('data').on('value',(snap)=>{
    //   console.log(snap.val());
    // });
    // this.db.database.ref('data').once('value',(snap)=>{
    //   console.log(snap.val());
    // });
    // this.db.database.ref('data').once('value', snapshot=> {
    //   snapshot.forEach(childSnapshot=> {
    //     var childKey = childSnapshot.key;
    //     var childData = childSnapshot.val();
    //     console.log(childKey);
    //     console.log(childData);
    //     console.log(childSnapshot);
    //   });
    // });
    // this.db.database.ref('data/gender/-M3e2ob3nXr4AjJwJ3Ca').on('value',(snap)=>{
    //   var totalRecord =  snap.numChildren();
    //   console.log("Total Record : "+totalRecord);
    // });
    // this.db.database.ref('data/'+1).update({name:'Raj'});
    // this.db.database.ref('data').remove();
  }

  onRegister(){
    // let credentials = JSON.stringify(this.registerForm.value);
    // if(this.registerForm.value.email.length==0 || this.registerForm.value.password.length==0){
    //   console.log('null');
    // }
    // else{
    //   localStorage.setItem('credentials',credentials);
    // }
    console.log(this.registerForm.value);
    console.log('Signup button clicked...');
    console.log(this.registerForm.value);
    this.auth.signUp(this.registerForm.value);
  }

  ngOnInit() {}

}