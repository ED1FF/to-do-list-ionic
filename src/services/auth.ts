import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EVENT_KEYS } from '../constants/events';
import { STORAGE_KEYS } from '../constants/storage';

@Injectable()
export class AuthService {
  constructor(private storage: Storage,
              public events: Events) {}

  get getToken() {
    return this.storage.get(STORAGE_KEYS.AUTH_TOKEN);
  }

  saveToken(token) {
    this.storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  signOut(){
    this.storage.clear();
    this.events.publish(EVENT_KEYS.SIGN_OUT);
  }
}
