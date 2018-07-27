import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskAPI } from '../../api/task';

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})

export class TasksPage {

  tasks:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public taskAPI: TaskAPI) {
  }

  ionViewDidLoad() {
    this.taskAPI.query().subscribe((data) => {
      console.log(data);
      this.tasks = data;
    })
  }

}
