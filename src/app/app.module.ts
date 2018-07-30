import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { TaskAPI } from './../api/task';
import { TasksPage } from '../pages/tasks/tasks';
import { NewTaskPage } from '../pages/new-task/new-task';
import { TaskFormPage } from '../pages/task-form/task-form';
import { TaskEditPage } from '../pages/task-edit/task-edit';

@NgModule({
  declarations: [
    MyApp,
    TasksPage,
    NewTaskPage,
    TaskFormPage,
    TaskEditPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TasksPage,
    NewTaskPage,
    TaskFormPage,
    TaskEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TaskAPI,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
