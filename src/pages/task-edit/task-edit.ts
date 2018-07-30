import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TaskAPI } from '../../api/task';
import { TasksPage } from '../tasks/tasks';

@IonicPage()
@Component({
  selector: 'page-task-edit',
  templateUrl: 'task-edit.html',
})

export class TaskEditPage {
  task:any = this.navParams.get('task');

  constructor(public nav: NavController, public navParams: NavParams, private taskAPI: TaskAPI, private toastCtrl: ToastController) {  }

  onSubmit(task) {
    this.taskAPI.update(this.task.id, { task: task }).subscribe(this.editSuccessHandler, this.editErrorHandler);
  }

  editErrorHandler = (error) => {
    this.showToaster(error);
  }

  editSuccessHandler = () => {
    this.nav.push(TasksPage);
    this.showToaster('Task has been updated!');
  }

  showToaster(toastText) {
    let toast = this.toastCtrl.create({
      message: toastText,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }
}
