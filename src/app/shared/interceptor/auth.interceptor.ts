import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private _TOKEN_HEADER_KEY = 'Authorization';

  constructor(private tokenStorageService: TokenStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = this.tokenStorageService.getToken();
    let cloneRequest = request;

    if((token != null) && (!request.url.includes('login'))) {

      cloneRequest = request.clone({ headers: request.headers.set(this._TOKEN_HEADER_KEY, 'Bearer ' + token) })
    }

    return next.handle(cloneRequest);
  }
}


