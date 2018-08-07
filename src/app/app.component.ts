import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignInPage } from '../pages/sign-in/sign-in';
import { TasksPage } from '../pages/tasks/tasks';
import { AuthService }  from './../auth/auth.service';
import { EVENT_KEYS } from './../constants/events';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public events: Events,
              public auth: AuthService) {

    events.subscribe(EVENT_KEYS.LOGGED_IN, () => {
      this.rootPage = TasksPage;
    });

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.setRootPage();
    });
  }

  setRootPage() {
    this.auth.getToken.then((val) => {
      if (val) {
        this.rootPage = TasksPage;
      } else {
        this.rootPage = SignInPage;
      }
    });
  }
}
