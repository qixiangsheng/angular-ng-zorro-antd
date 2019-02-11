import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  // 登录
  login(url, data) {
    return this.http.post(url, data, {
      headers: {
        'No-Auth': 'TRUE'
      }
    });
  }
}
