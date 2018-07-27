import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { TaskAPI } from '../../api/task';

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})

export class TasksPage {
  tasks:any = [];

  constructor(public taskAPI: TaskAPI) { }

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

  markAsDone() {
    
  }
}
