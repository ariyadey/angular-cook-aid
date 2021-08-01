import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-web-otp-demo',
  templateUrl: './web-otp-demo.component.html',
  styleUrls: ['./web-otp-demo.component.css']
})
export class WebOtpDemoComponent implements
  OnInit
  // AfterContentInit,
  // AfterViewInit
{

  form!: FormGroup;
  webOtpSupported!: boolean;

  constructor() {
  }

  ngOnInit(): void {
    // this.webOtpSupported = false;
    this.initForm();
    this.initWebOtpApi();
    // alert("OTPCredential" in window);
  }

  // ngAfterContentInit(): void {
  //   // throw new Error('Method not implemented.');
  //   // alert("OTPCredential" in window)
  // }
  //
  // ngAfterViewInit(): void {
  //   // throw new Error('Method not implemented.');
  //   alert("OTPCredential" in window);
  // }

  private initForm() {
    this.form = new FormGroup({
      otp: new FormControl(null, [Validators.required]),
    });
  }

  private initWebOtpApi() {
    if ("OTPCredential" in window) {
      alert(true);
      this.webOtpSupported = true;
      window.addEventListener("DOMContentLoaded", e => {
        const input = document.querySelector("input[autocomplete='one-time-code']");
        if (!input) return;
        const ac = new AbortController();
        const form = input.closest("form");
        if (!form) return;
        form.addEventListener("submit", e => {
          ac.abort();
        });
        const credentialReqOptions = {
          otp: {transport: ["sms"]},
          signal: ac.signal
        };
        navigator.credentials.get(credentialReqOptions)
          .then(otp => {
            if (otp) {
              // @ts-ignore
              input.nodeValue = otp!.code;
              form?.submit();
            }
          }).catch(err => {
          console.log(err);
        });
      });
    } else {
      this.webOtpSupported = false;
      alert(false);
    }
  }

  onSubmit() {
    const otp: string = this.form.value["otp"];
    if (this.validateOtp(otp)) {
      alert(`You are authorized with code: ${otp}`);
    } else {
      alert("The entered OTP is wrong!")
    }
  }

  private validateOtp(otp: string) {
    return otp === "12345";
  }
}
