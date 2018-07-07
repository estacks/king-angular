import { Component, OnInit } from '@angular/core';
import { WpService } from 'src/app/services/wp.service';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  email = {
    email: '',
    name: '',
    message: ''
  };
  recaptchaResponse: string;
  error: string;
  success: boolean = false;

  constructor(public wp: WpService) {}

  ngOnInit() {}

  onResolved(captcha): void {
    if (captcha === null) return;

    this.recaptchaResponse = captcha;

    this.submitForm();
  }

  submitForm() {
    this.clearError();
    console.log('onSubmit', this.email, this.recaptchaResponse);

    if (
      this.email.email.length < 1 ||
      this.email.name.length < 1 ||
      this.email.message.length < 1
    )
      return this.showError('Please completely fill out the form.');
    if (!this.recaptchaResponse)
      return this.showError('You need to fill out the reCAPTCHA.');

    this.wp
      .post('king-angular/v1/contact', this.email, { noRoot: true })
      .subscribe(res => {
        console.log('Server response', res);

        //Show success message, hide it after 5 seconds.
        this.success = true;

        setTimeout(() => {
          this.success = false;
        }, 5000);
      });
  }

  onSubmit(event, captchaRef: any) {
    if (this.recaptchaResponse) captchaRef.reset();
    captchaRef.execute();
  }

  showError(message: string) {
    this.error = message;
  }

  clearError() {
    this.error = undefined;
  }
}
