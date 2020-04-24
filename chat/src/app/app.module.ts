import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WebsocketService } from './services/websocket.service';
import { UsersService } from './services/users.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { environment } from './../environments/environment';
import { ChatComponent } from './chat/chat.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FriendsComponent } from './friends/friends.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotfoundComponent,
    ChatComponent,
    RegisterComponent,
    FriendsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AlifeFileToBase64Module
  ],
  providers: [ WebsocketService, UsersService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
