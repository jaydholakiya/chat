import { LoggedinGuard } from './guards/loggedin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ChatComponent } from './chat/chat.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { FriendsComponent } from './friends/friends.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo : '/login',
    pathMatch : 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate : [LoggedinGuard]
  },
  {
    path: 'friends',
    component: FriendsComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'navbar',
    component: NavbarComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate : [LoggedinGuard]
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate : [ AuthGuard ]
  },
  {
    path: '**',
    component: NotfoundComponent,
    canActivate : [LoggedinGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
