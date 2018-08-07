import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AuthService } from "./../auth/auth.service";
import { TokenInterceptor } from './../auth/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MyApp } from './app.component';
import { TaskAPI } from './../api/task';
import { UserAPI } from './../api/user';
import { TasksPage } from '../pages/tasks/tasks';
import { NewTaskPage } from '../pages/new-task/new-task';
import { TaskFormPage } from '../pages/task-form/task-form';
import { TaskEditPage } from '../pages/task-edit/task-edit';
import { SignInPage } from '../pages/sign-in/sign-in';

@NgModule({
  declarations: [
    MyApp,
    TasksPage,
    NewTaskPage,
    TaskFormPage,
    TaskEditPage,
    SignInPage
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
    SignInPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    TaskAPI,
    UserAPI,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ]
})
export class AppModule {}
