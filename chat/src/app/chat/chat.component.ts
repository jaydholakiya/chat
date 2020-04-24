import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  today;
  time;
  messageData;
  a = [];
  users = [];
  messages:any=[];

  messageSend = new FormGroup({
    chatMessage : new FormControl('',Validators.required)
  })

  constructor( private db : AngularFireDatabase,
    private chats : UsersService ) {
      db.list('/chat').valueChanges().subscribe(chats=>{
        this.messages = chats;
        // console.log(this.messages);
      });
      db.database.ref('/chat/'+localStorage.getItem('displayName')+'_'+localStorage.getItem('uid')).once('value',snapshot=>{
        snapshot.forEach(childSnapshot=>{
          this.messages.push(childSnapshot.val());
          console.log(childSnapshot.val().message);
        });
      });
  }

  chat() {
    // this.a=[];
    this.db.database.ref('chat/'+localStorage.getItem('displayName')+'_'+localStorage.getItem('uid')).push({
      chatId : localStorage.getItem('uid'),
      message : this.messageSend.value.chatMessage,
      senderId : localStorage.getItem('uid'),
      receiverId : 'receiverId',
      timeStamp : this.today = Date.now()      
    }).then(()=>{
      this.messageSend.setValue({chatMessage:''});
      this.disable();
    })
    .catch(err=>{
      console.log(err);
    })
  }
  disable() {
    if( this.messageSend.value.chatMessage.length != 0 ) {
      return false;
    }
    else if ( this.messageSend.value.chatMessage.length == 0 ) {
      return true;
    }
  }

  getUsers() {
    this.db.database.ref('users').once('value',snapshot=>{
      snapshot.forEach(childSnapshot=>{
        this.users.push(childSnapshot.val().displayName);
      });
    })
  }

  ngOnInit() {
    this.getUsers();
    this.db.database.ref('chat/'+'Nilesh Dholakiya_MIoNE5XllvPP2dEeYavk47iEmlx2').on('value',(snap)=>{
      snap.forEach(childSnapshot => {
        this.messageData = childSnapshot.val();
        this.time =  this.messageData.timeStamp;
      })
    });
  }
}