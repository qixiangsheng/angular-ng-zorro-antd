import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 登录
    if (req.headers.get('No-Auth') === 'TRUE') {
      return next.handle(req);
    }

    // 非登录
    const token = localStorage.getItem('itcast-token');
    /*
        const cloneReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
    */
    const cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(cloneReq).pipe(
      tap(
        ok => {
        },
        error => {
          if (error.status === 401) {
            localStorage.removeItem('itcast-token');
            this.router.navigate(['/login']);
          }
        }
      )
    );
  }
}
