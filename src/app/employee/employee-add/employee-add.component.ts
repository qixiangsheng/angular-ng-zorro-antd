import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private es: EmployeeService,
              private router: Router,
              private nzMsg: NzMessageService
  ) {
  }

  isLoading = false;
  validateForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    gender: ['男'],
    age: ['', [Validators.required, Validators.min(1)]],
    address: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^1[0-9]{10}$/)]]
  });

  submitForm($event, value) {
    $event.preventDefault();
    this.isLoading = true;
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
    this.es.addEmployee(value).subscribe(res => {
      this._resetForm();
      this.isLoading = false;
      this.nzMsg.info('添加成功', {nzDuration: 1000});
      // this.router.navigate(['/home/employee']);
    }, err => {
      this.isLoading = false;
      this.nzMsg.info('添加失败，请稍后再试！', {nzDuration: 1000});
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this._resetForm();
  }

  _resetForm() {
    this.validateForm.reset({
      gender: '男'
    });
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  ngOnInit() {
  }

}
