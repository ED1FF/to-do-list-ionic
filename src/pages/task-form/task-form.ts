import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-task-form',
  templateUrl: 'task-form.html',
})
export class TaskFormPage implements OnInit {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  taskForm:FormGroup;
  @Input() task:any = {};

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      name: [''],
      description: ['']
    });
  }

  submit() {
    this.onSubmit.emit(this.taskForm.value);
  }
}
