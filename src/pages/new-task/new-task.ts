import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TaskFormPage } from '../task-form/task-form';
import { TaskAPI } from '../../api/task';
import { TasksPage } from '../tasks/tasks';

@Component({
  selector: 'page-new-task',
  templateUrl: 'new-task.html',
})

export class NewTaskPage {

  constructor(public taskAPI: TaskAPI, public nav: NavController) {
  }

  onSubmit(task) {
    this.taskAPI.create({ task: task }).subscribe(() => {
      this.nav.push(TasksPage);
    });
  }
}
