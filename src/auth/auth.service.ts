import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { STORAGE_KEYS } from '../constants/storage';

@Injectable()
export class AuthService {
  constructor(private storage: Storage) {}

  get getToken() {
    return this.storage.get(STORAGE_KEYS.AUTH_TOKEN);
  }

  saveToken(token) {
    this.storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  signOut(){
    this.storage.clear();
  }
}
