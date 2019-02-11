import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {URL_Token} from '../config';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  // 获取员工数据
  getEmployeeData(page, limit) {
    const url = `${URL_Token}/employee?_page=${page}&_limit=${limit}`;
    // @ts-ignore
    return this.http.get<HttpResponse>(url, {
      observe: 'response'
    });
  }

  // 获取具体员工数据
  getOneEmployeeData(id) {
    return this.http.get(`${URL_Token}/employee/${id}`);
  }

  // 添加员工
  addEmployee(employee) {
    return this.http.post(`${URL_Token}/employee`, employee);
  }

  // 删除员工
  deleteEmployee(id) {
    return this.http.delete(`${URL_Token}/employee/${id}`);
  }

  // 修改员工信息
  editOneEmployeeData(id, data) {
    return this.http.patch(`${URL_Token}/employee/${id}`, data);
  }
}
