import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {AuthResponseModel} from "./auth-response.model";
import {Router} from "@angular/router";

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

  constructor(private authService: AuthService, private router: Router) { }

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
    let authObservable: Observable<AuthResponseModel>
    this.loading = true;
    this.error = null;

    if (this.modeLogin) {
      authObservable = this.authService.login(this.form.value.email, this.form.value.password);
    } else {
      authObservable = this.authService.signup(this.form.value.email, this.form.value.password);
    }

    authObservable.subscribe(
      authResponse => {
        this.loading = false;
        this.router.navigate(["/recipes"]);
        console.log(authResponse);
      },
      errorMessage => {
        this.loading = false;
        this.error = errorMessage;
        console.log(errorMessage);
      },
    )
  }
}
