import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let observableToken = Observable.fromPromise(this.auth.getToken);

    return observableToken.mergeMap((value) => {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${value}`
        }
      });
      return next.handle(request);
    });
  }
}
