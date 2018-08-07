import { Component, OnInit } from '@angular/core';
import { ToastController, Events } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionAPI } from "../../api/session";
import { EVENT_KEYS } from '../../constants/events';
import { CustomValidators } from 'ng2-validation';
import { SignUpPage }  from '../sign-up/sign-up';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})

export class SignInPage implements OnInit {
  signInForm:FormGroup;
  signUpPage:any = SignUpPage;

  constructor(private toastCtrl: ToastController,
              public auth: AuthService,
              public events: Events,
              public fb: FormBuilder,
              public sessionApi: SessionAPI) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([8, 24])]]
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
