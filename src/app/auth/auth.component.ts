import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form!: FormGroup;
  modeLogin = true;
  error!: Error | null;
  loading = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  switchMode() {
    this.modeLogin = !this.modeLogin;
  }

  onSubmit() {
    this.loading = true;
    if (this.modeLogin) {
      //...
    } else {
      this.authService.signup(this.form.value.email, this.form.value.password)
        .subscribe(
          authResponse => {
            this.loading = false;
            this.error = null;
            console.log(authResponse);
          },
          error => {
            this.loading = false;
            this.error = error;
            console.log(error);
          },
        )
    }
  }
}
