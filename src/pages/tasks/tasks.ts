import { Component, ErrorHandler } from '@angular/core';
import { IonicPage, NavController, IonicErrorHandler } from 'ionic-angular';
import { TaskAPI } from '../../api/task';
import { NewTaskPage } from '../new-task/new-task';
import { TaskEditPage } from '../task-edit/task-edit';


@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})

export class TasksPage {
  tasks:any = [];
  createTaskPage:any = NewTaskPage;
  taskEditPage:any = TaskEditPage;

  constructor(public taskAPI: TaskAPI) {  }

  ionViewDidLoad() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskAPI.query().subscribe((data) => {
      this.tasks = data;
    })
  }

  delete(task) {
    if(confirm("Are you sure to delete?")) {
      this.taskAPI.delete(task.id).subscribe(() => this.deleteSuccessHandler(task), this.deleteErrorHandler);
    }
  }

  deleteErrorHandler = (error) => {
    alert(error);
  }

  deleteSuccessHandler = (task) => {
    this.tasks = this.tasks.filter((item) => item.id != task.id );
  }

  markAsDone(task) {
    this.taskAPI.update(task.id, { done: !task.done }).subscribe( this.markSuccessHandler, this.markErrorHandler );
  }

  markErrorHandler = (error) => {
    alert(error);
  }

  markSuccessHandler = () => {  } // add notify
}
