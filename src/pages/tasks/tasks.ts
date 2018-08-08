import { Component, ErrorHandler } from '@angular/core';
import { NavController, IonicErrorHandler } from 'ionic-angular';
import { TaskAPI } from '../../api/task';
import { NewTaskPage } from '../new-task/new-task';
import { TaskEditPage } from '../task-edit/task-edit';
import { ItemSliding, ToastController, AlertController } from 'ionic-angular';
import { AuthService }  from '../../services/auth';
import { TaskShowPage }  from '../task-show/task-show';

@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})

export class TasksPage {
  tasks:any = [];
  isDone:boolean = false;
  createTaskPage:any = NewTaskPage;
  taskEditPage:any = TaskEditPage;
  taskShowPage:any = TaskShowPage;

  constructor(public taskAPI: TaskAPI,
              public auth: AuthService,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {  }

  ionViewDidLoad() {
    this.loadTasks();
  }

  loadTasks(refresher = undefined) {
    this.taskAPI.query().subscribe((data) => {
      this.tasks = data;
      refresher && refresher.complete();
    }, (error) =>{
      this.showToaster(error);
      refresher && refresher.complete();
    });
  }

  delete(task) {
    this.taskAPI.delete(task.id).subscribe(() => this.deleteSuccessHandler(task), this.showToaster)
  }

  deleteSuccessHandler = (task) => {
    this.tasks = this.tasks.filter((item) => item.id != task.id );
    this.showToaster('Task has been deleted!');
  }

  markAsDone(task, slidingItem) {
    this.closeSlidingItem(slidingItem)
    this.taskAPI.update(task.id, { done: !task.done }).subscribe(() => this.markSuccessHandler(task), this.showToaster);
  }

  markSuccessHandler = (task) => {
    Object.assign(task, { done: !task.done });
    this.showToaster('Task status has been changed!');
  }

  showToaster = (toastText) => {
    let toast = this.toastCtrl.create({
      message: toastText,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  closeSlidingItem(slidingItem: ItemSliding) {
    slidingItem.close();
  }

  deleteConfirm(task) {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to delete this task?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.delete(task);
          }
        }
      ]
    });
    alert.present();
  }
}
