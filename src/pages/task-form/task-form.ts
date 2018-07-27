import { Component, Output, EventEmitter } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-task-form',
  templateUrl: 'task-form.html',
})
export class TaskFormPage {
  @Output() onCreate: EventEmitter<any> = new EventEmitter();
  taskForm = new FormGroup ({
    name: new FormControl(),
    description: new FormControl()
  });

  constructor(public fb: FormBuilder) { }

  createForm() {
    this.taskForm = this.fb.group({
      name: [''],
      description: ['']
    });
  }

  create() {
    this.onCreate.emit(this.taskForm.value)
  }
}
