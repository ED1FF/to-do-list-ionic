import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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

  delete() {

  }

  markAsDone(task) {
    this.taskAPI.update(task.id, { done: !task.done }).subscribe(() => {
    });
  }
}
