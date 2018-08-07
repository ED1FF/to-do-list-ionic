import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAPI } from "../../api/user";
import { TasksPage } from "../tasks/tasks";

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})

export class SignInPage implements OnInit {
  signInForm:FormGroup;
  user:any = {};

  constructor(public navCtrl: NavController,
              public auth: AuthService,
              private toastCtrl: ToastController,
              public fb: FormBuilder,
              public userApi: UserAPI) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    this.userApi.signIn(this.signInForm.value).subscribe((data) => this.submitSuccessHandler(data), this.submitErrorHandler)
  }

  submitSuccessHandler = (data) => {
    this.auth.saveToken(data['token']);
    this.navCtrl.push(TasksPage)
  }

  submitErrorHandler = (error) => {
    this.showToaster(error.error['message']);
  }

  showToaster(toastText) {
    let toast = this.toastCtrl.create({
      message: toastText,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

}