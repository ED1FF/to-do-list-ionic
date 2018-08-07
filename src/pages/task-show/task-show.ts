import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-task-show',
  templateUrl: 'task-show.html',
})

export class TaskShowPage {
  task:any = this.navParams.get('task');

  constructor(public navParams: NavParams) {}

}
