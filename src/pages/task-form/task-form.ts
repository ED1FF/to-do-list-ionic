import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      name: [this.task.name, [Validators.required]],
      description: [this.task.description, [Validators.required]]
    });
  }

  submit() {
    this.onSubmit.emit(this.taskForm.value);
  }
}
