import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthService {
  constructor(private storage: Storage) {}

  public get getToken() {
    return this.storage.get('auth_token');
  }

  public saveToken(token) {
    this.storage.set('auth_token', token);
  }

  public signOut(){
    localStorage.clear();
  }

  public get isAuthenticated() {
    return localStorage.getItem('auth_token') != null;
  }
}
