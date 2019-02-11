import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {EmployeeService} from '../employee.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private es: EmployeeService,
              private nzMsg: NzMessageService,
              private fb: FormBuilder
  ) {
  }

  _page = 1;
  _limit = 5;
  _total: number;
  isLoading = false;
  isEditing = false;
  frontPage = false;
  employeeData = [];
  showEditModal = false;
  editId: number;

  validateForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    gender: ['男'],
    age: ['', [Validators.required, Validators.min(1)]],
    address: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^1[0-9]{10}$/)]]
  });

  // 获取员工数据
  getEmployeeData() {
    this.isLoading = true;
    // @ts-ignore
    this.es.getEmployeeData(this._page, this._limit).subscribe((res: HttpResponse) => {
      this._total = res.headers.get('X-Total-Count');
      this.employeeData = res.body;
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    });
  }

  // 删除员工
  confirmDel(id) {
    this.isLoading = true;
    this.es.deleteEmployee(id).subscribe(res => {
      this.nzMsg.info('删除成功', {nzDuration: 1000});
      this.isLoading = false;
      this.getEmployeeData();
    }, err => {
      this.nzMsg.info('删除失败，请稍后重试！', {nzDuration: 1000});
    });
  }

  // 打开编辑模态框
  openEditModal(id) {
    this.editId = id;
    this.showEditModal = true;
    this.isEditing = true;
    this.es.getOneEmployeeData(id).subscribe((res: any) => {
      this.isEditing = false;
      for (const key in this.validateForm.controls) {
        if (this.validateForm.controls.hasOwnProperty(key)) {
          this.validateForm.get(key).setValue(res[key] || '');
        }
      }
    }, err => {
      this.isEditing = false;
    });
  }

  // 取消编辑
  cancelEdit() {
    this.resetForm();
    this.showEditModal = false;
  }

  // 确定编辑
  sureEdit() {
    if (!this.validateForm.valid) {
      return;
    }
    this.isEditing = true;
    this.es.editOneEmployeeData(this.editId, this.validateForm.value).subscribe(res => {
      this.nzMsg.info('编辑成功', {nzDuration: 1000});
      this.isEditing = false;
      this.showEditModal = false;
      this.resetForm();
      this.getEmployeeData();
    }, err => {
      this.nzMsg.info('编辑失败，请稍后再试！', {nzDuration: 1000});
      this.isEditing = false;
      this.resetForm();
    });
  }

  // 重置表格
  resetForm() {
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  ngOnInit() {
    this.getEmployeeData();
  }

}
