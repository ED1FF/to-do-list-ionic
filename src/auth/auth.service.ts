import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { STORAGE_KEYS } from '../constants/constants';

@Injectable()
export class AuthService {
  constructor(private storage: Storage) {}

  public get getToken() {
    return this.storage.get(STORAGE_KEYS.AUTH_TOKEN);
  }

  public saveToken(token) {
    this.storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  public signOut(){
    this.storage.clear();
  }
}
