import { Injectable } from '@angular/core';
import { AppUser } from '../models/app-user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  get user(): AppUser {
    const appUser = {} as AppUser;

    if (localStorage.getItem('accessToken')) {
      appUser.accessToken = localStorage.getItem('accessToken');
      appUser.email = localStorage.getItem('email');
      appUser.username = localStorage.getItem('username');
      appUser.role = localStorage.getItem('role');
      return appUser;

    }
    else {

      return null;
    }
  }
}

