import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TaskFormPage } from '../task-form/task-form';
import { TaskAPI } from '../../api/task';
import { TasksPage } from '../tasks/tasks';

@IonicPage()
@Component({
  selector: 'page-new-task',
  templateUrl: 'new-task.html',
})

export class NewTaskPage {
  task:any = []

  constructor(public taskAPI: TaskAPI, public nav: NavController) {
  }

  onCreate(task) {
    this.taskAPI.create({ task: task }).subscribe(() => {
      this.nav.push(TasksPage);
    })
  }
}
