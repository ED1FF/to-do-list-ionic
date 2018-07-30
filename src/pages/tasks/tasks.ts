import { Component, ErrorHandler } from '@angular/core';
import { IonicPage, NavController, IonicErrorHandler } from 'ionic-angular';
import { TaskAPI } from '../../api/task';
import { NewTaskPage } from '../new-task/new-task';
import { TaskEditPage } from '../task-edit/task-edit';
import { ItemSliding, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})

export class TasksPage {
  tasks:any = [];
  isDone:boolean = false;
  createTaskPage:any = NewTaskPage;
  taskEditPage:any = TaskEditPage;

  constructor(public taskAPI: TaskAPI, private toastCtrl: ToastController) {  }

  ionViewDidLoad() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskAPI.query().subscribe((data) => {
      this.tasks = data;
    });
  }

  delete(task) {
    if(confirm("Are you sure to delete?")) {
      this.taskAPI.delete(task.id).subscribe(() => this.deleteSuccessHandler(task), this.deleteErrorHandler);
    }
  }

  deleteErrorHandler = (error) => {
    this.callToaster(error);
  }

  deleteSuccessHandler = (task) => {
    this.tasks = this.tasks.filter((item) => item.id != task.id );
    this.callToaster('Task has been deleted!');
  }

  markAsDone(task, slidingItem) {
    this.closeSlidingItem(slidingItem)
    this.taskAPI.update(task.id, { done: !task.done }).subscribe(() => this.markSuccessHandler(task), this.markErrorHandler );
  }

  markErrorHandler = (error) => {
    this.callToaster(error);
  }

  markSuccessHandler = (task) => {
    Object.assign(task, { done: !task.done });
    this.callToaster('Task status has been changed!');
  }

  callToaster(toastText){
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
}
