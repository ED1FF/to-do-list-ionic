import { Component } from '@angular/core';
import { NavController, Events, ToastController } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EVENT_KEYS } from '../../constants/events';
import { AuthService } from '../../auth/auth.service';
import { SignInPage }  from '../sign-in/sign-in';
import { UserAPI } from "../../api/user";
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})

export class SignUpPage {
  signUpForm:FormGroup;
  signInPage:any = SignInPage;
  password = new FormControl('', [Validators.required, CustomValidators.rangeLength([8, 24])]);
  password_confirmation = new FormControl('', [Validators.required, CustomValidators.equalTo(this.password)]);

  constructor(private toastCtrl: ToastController,
              public auth: AuthService,
              public events: Events,
              public fb: FormBuilder,
              public userApi: UserAPI) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
      password: this.password,
      password_confirmation: this.password_confirmation
    });
  }

  submit() {
    this.userApi.create({user: this.signUpForm.value}).subscribe(this.submitSuccessHandler, this.submitErrorHandler);
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
