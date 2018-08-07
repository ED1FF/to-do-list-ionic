import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAPI } from "../../api/user";
import { Events } from 'ionic-angular';
import { EVENT_KEYS } from '../../constants/constants';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})

export class SignInPage implements OnInit {
  signInForm:FormGroup;

  constructor(public navCtrl: NavController,
              public auth: AuthService,
              private toastCtrl: ToastController,
              public events: Events,
              public fb: FormBuilder,
              public userApi: UserAPI) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    this.userApi.signIn(this.signInForm.value).subscribe((data) => this.submitSuccessHandler(data), this.submitErrorHandler);
  }

  submitSuccessHandler = (data) => {
    this.auth.saveToken(data['token']);
    this.events.publish(EVENT_KEYS.SIGN_IN);
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
