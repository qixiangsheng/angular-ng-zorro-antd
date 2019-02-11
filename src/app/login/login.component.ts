import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

import {LoginService} from './login.service';
import {URL} from '../config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private ls: LoginService, private router: Router) {
  }

  isLoading = false;
  loginForm: FormGroup;

  submitForm(): void {
    for (const i in this.loginForm.controls) {
      if (this.loginForm.controls.hasOwnProperty(i)) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }

    // 检验表单是否通过验证
    if (!this.loginForm.valid) {
      console.log('校验失败');
      return;
    }

    console.log('校验成功');
    const data = {
      user: {
        email: '465540904@qq.com',
        password: 'admin123'
      }
    };
    this.isLoading = true;
    this.ls.login(URL, data).subscribe((res: any) => {
      this.isLoading = false;
      localStorage.setItem('itcast-token', res.user.token);
      this.router.navigate(['/home']);
    }, err => {
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3,}$/)]]
    });
  }
}
