import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { SignInPage } from '../pages/sign-in/sign-in';
import { TasksPage } from '../pages/tasks/tasks';
import { AuthService }  from './../auth/auth.service';

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

    if (this.auth.isAuthenticated) {
      this.rootPage = TasksPage;
    } else {
      this.rootPage = SignInPage;
    }

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
