import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-web-otp-demo',
  templateUrl: './web-otp-demo.component.html',
  styleUrls: ['./web-otp-demo.component.css']
})
export class WebOtpDemoComponent implements OnInit {

  form!: FormGroup;
  webOtpSupported!: boolean;
  abortController!: AbortController;

  constructor() {
  }

  ngOnInit(): void {
    this.initForm();
    this.webOtpSupported = "OTPCredential" in window;
    // this.initWebOtpApi();
  }

  private initForm() {
    this.form = new FormGroup({
      otp: new FormControl(null, [Validators.required]),
    });
  }

  private initWebOtpApi() {
    this.webOtpSupported = "OTPCredential" in window;
    if (this.webOtpSupported) {
      window.addEventListener("DOMContentLoaded", e => {
        const credentialReqOptions = {
          otp: {transport: ["sms"]},
          signal: this.abortController.signal
        };
        navigator.credentials.get(credentialReqOptions)
          .then(otp => {
            // @ts-ignore
            this.form.patchValue({otp: otp!.code,});
            document.querySelector("form")?.requestSubmit();
          }).catch(err => {
          console.log(err);
        });
      });
    }
  }

  onSubmit() {
    this.abortController.abort();
    const otp: string = this.form.value["otp"];
    if (this.validateOtp(otp)) {
      alert(`You are authorized with code: ${otp}`);
    } else {
      alert(`The entered OTP is wrong!: ${otp}`)
    }
  }

  private validateOtp(otp: string) {
    return otp === "12345";
  }
}
