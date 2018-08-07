import { Component } from '@angular/core';
import { NavController, Events, ToastController } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EVENT_KEYS } from '../../constants/events';
import { AuthService } from '../../auth/auth.service';
import { UserAPI } from "../../api/user";

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})

export class SignUpPage {
  signUpForm:FormGroup;

  constructor(private toastCtrl: ToastController,
              public auth: AuthService,
              public events: Events,
              public fb: FormBuilder,
              public userApi: UserAPI) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]]
    });
  }

  submit() {
    this.userApi.create(this.signUpForm.value).subscribe(this.submitSuccessHandler, this.submitErrorHandler);
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
