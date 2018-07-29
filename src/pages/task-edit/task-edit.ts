import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskAPI } from '../../api/task';
import { TasksPage } from '../tasks/tasks';

@IonicPage()
@Component({
  selector: 'page-task-edit',
  templateUrl: 'task-edit.html',
})

export class TaskEditPage {
  task:any = this.navParams.get('task') ;

  constructor(public nav: NavController, public navParams: NavParams, private taskAPI: TaskAPI) {  }

  onSubmit(task) {
    this.taskAPI.update(this.task.id, { task: task }).subscribe((data) => {
      this.nav.push(TasksPage);
    });
  }
}
