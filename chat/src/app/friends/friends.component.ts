import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  users=[];
  displayName : string;
  profilePic: any;
  btnTxt : string = 'Send';
  click: boolean = false;
  uids : any = [];
  
  constructor( private db : AngularFireDatabase ) {}
  
  getUsers() {
    this.users=[];
    this.db.database.ref('users').once('value',snapshot=>{
      snapshot.forEach(childSnapshot=>{
        this.users.push(childSnapshot.val().displayName);
        this.uids = childSnapshot.key;
        this.displayName = localStorage.getItem('displayName');
        this.users = this.users.filter((item)=>item!==this.displayName);
        console.log(this.users);
      });
    });
  }

  sendRequest(event) {
    console.log(event.target.id);
    console.log(event.target.value);
    // console.log(event);
    // this.click = !this.click;
    // if(this.click) {
    //   this.btnTxt="Cancel";
    // }
    // else if (!this.click) {
    //   this.btnTxt="Send";
    // }
    // console.log(this.click);
  }

  ngOnInit() {
    this.getUsers();
  }
}