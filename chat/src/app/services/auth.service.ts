import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService
{

  logIn : boolean;
  
  constructor
  (
    private afAuth : AngularFireAuth,
    private router : Router,
    private db : AngularFireDatabase ) {
      if( localStorage.getItem('uid') ) {
        this.logIn = true;
      }
      else {
        this.logIn = false;
      }
  }

  signUp(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password).then(userCredential =>{
      this.router.navigate(['/login']);
      this.insertUserData(userCredential,user);
      console.log('Success');
      console.log(userCredential);
      // this.uid = userCredential.user.uid;
      userCredential.user.updateProfile({
        displayName : user.firstName + ' ' + user.lastName
      });
      console.log(userCredential.user.displayName);
    })
  }

  insertUserData(userCredential : firebase.auth.UserCredential,user) {
    console.log(user);
      this.db.database.ref('users/'+userCredential.user.uid).set({
      displayName : user.firstName + ' ' + user.lastName,
      email : user.email
    });
  }
// Get a reference to the database service
  signIn(email : string,password : string)
  {
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then(userCredential => {
        if ( userCredential )
        {
          let uid = userCredential.user.uid;
          localStorage.setItem('uid',uid);
          localStorage.setItem('displayName',userCredential.user.displayName);
          this.logIn=true;
          console.log(uid);    
          this.router.navigate(['/chat']);
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  logOut() {
    localStorage.removeItem('uid');
    localStorage.removeItem('displayName');
    this.logIn=false;
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}