import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        try {
            return next.handle(this.addAuthToken(request));
        } catch (error) {
            // console.log('Error de interceptor: ', error);
            return next.handle(request);
        }
    }

    addAuthToken(request: HttpRequest<any>) {
        const token = this.authService.getAuthToken();

        if (!token) {
            throw 'No existe el token en las cookies';
        }

        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}
