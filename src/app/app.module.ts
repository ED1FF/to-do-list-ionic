import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AuthService } from "./../services/auth";
import { TokenInterceptor } from './../auth/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MyApp } from './app.component';
import { SessionAPI }  from './../api/session';
import { TaskAPI } from './../api/task';
import { UserAPI } from './../api/user';
import { TasksPage } from '../pages/tasks/tasks';
import { NewTaskPage } from '../pages/new-task/new-task';
import { TaskFormPage } from '../pages/task-form/task-form';
import { TaskEditPage } from '../pages/task-edit/task-edit';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage }  from '../pages/sign-up/sign-up';
import { TaskShowPage }  from '../pages/task-show/task-show';

@NgModule({
  declarations: [
    MyApp,
    TasksPage,
    NewTaskPage,
    TaskFormPage,
    TaskEditPage,
    SignInPage,
    SignUpPage,
    TaskShowPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TasksPage,
    NewTaskPage,
    TaskFormPage,
    TaskEditPage,
    SignInPage,
    SignUpPage,
    TaskShowPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    SessionAPI,
    TaskAPI,
    UserAPI,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ]
})
export class AppModule {}
