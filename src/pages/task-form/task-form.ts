import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { TaskAPI } from '../../api/task';
import { TasksPage } from '../tasks/tasks';

@IonicPage()
@Component({
  selector: 'page-task-form',
  templateUrl: 'task-form.html',
})
export class TaskFormPage {
  taskForm = new FormGroup ({
    name: new FormControl(),
    description: new FormControl()
  });
  task:any = []

  constructor(public taskAPI: TaskAPI, public fb: FormBuilder, public nav: NavController) {
  }

  createForm() {
    this.taskForm = this.fb.group({
      name: [''],
      description: ['']
    });
  }

  create() {
    this.taskAPI.create({ task: this.taskForm.value }).subscribe((data) => {
      this.task = data;
      this.nav.push(TasksPage);
    })
  }
}
