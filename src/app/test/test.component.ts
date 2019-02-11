import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }
  validateForm: FormGroup;
  handleUnlimited() {
    setTimeout(() => {
      const {unlimited, industryOptions} = this.validateForm.value;
      if (unlimited) {
        industryOptions.forEach(item => {
          item.checked = false;
        });
        this.validateForm.get('industryOptions').setValue(industryOptions);
      }
    }, 100);
  }
  updateSingleIndustry() {
    const {industryOptions} = this.validateForm.value;
    if (industryOptions.every(item => item.checked === false)) {
      this.validateForm.get('unlimited').setValue(true);
    } else {
      this.validateForm.get('unlimited').setValue(false);
    }
  }

  // 提交表单
  submitForm() {
    const {value} = this.validateForm;
    console.log(value);
  }

  ngOnInit() {
    const industryOptions = [
      {label: '通信', value: '1', checked: false},
      {label: '建筑', value: '2', checked: false},
      {label: '钢铁', value: '3', checked: false},
      {label: '医药', value: '4', checked: false}
    ];
    this.validateForm = this.fb.group({
      unlimited: [true],
      industryOptions: [industryOptions]
    });
  }


}
