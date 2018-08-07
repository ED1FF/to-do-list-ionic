import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ToastController, Events } from 'ionic-angular';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionAPI } from "../../api/session";
import { EVENT_KEYS } from '../../constants/events';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})

export class SignInPage implements OnInit {
  signInForm:FormGroup;

  constructor(private toastCtrl: ToastController,
              public navCtrl: NavController,
              public auth: AuthService,
              public events: Events,
              public fb: FormBuilder,
              public sessionApi: SessionAPI) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    this.sessionApi.create(this.signInForm.value).subscribe(this.submitSuccessHandler, this.submitErrorHandler);
  }

  submitSuccessHandler = (data) => {
    this.auth.saveToken(data['token']);
    this.events.publish(EVENT_KEYS.LOGGED_IN);
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
