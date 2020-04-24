import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService {

  users: BehaviorSubject<any>;

  // Our constructor calls our wsService connect method
  constructor (private wsService: WebsocketService) {
    this.users = <BehaviorSubject<any>>wsService
      .connect()
      .pipe(map((response: any): any => {
        return response;
      }))
   }

  // Our simplified interface for sending
  // messages back to our socket.io server
  showUsers(msg) {
    this.users.next(msg);
  }

}