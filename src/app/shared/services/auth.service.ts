import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from './users.service';
import { environment } from '../../../environments/environment';

interface userSigIn {
    username: String;
    password: String;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService,
        private cookiesService: CookieService,
        private usersService: UsersService
    ) {}
    private URL = environment.apiUrl;

    signIn(user: userSigIn) {
        return this.http.post(`${this.URL}/auth/user`, user);
    }

    isAuth(): boolean {
        const token: string = this.getAuthToken();
        if (!token || this.jwtHelper.isTokenExpired(token)) return false;
        return true;
    }

    setAuthToken(token: string) {
        return this.cookiesService.set('jwt_token', token);
    }

    signOut() {
        sessionStorage.clear();
        localStorage.clear();
        this.cookiesService.delete('jwt_token');
    }

    getAuthToken(): string {
        return this.cookiesService.get('jwt_token');
    }

    getSessionInfo(token: string) {
        return this.jwtHelper.decodeToken(token);
    }

    getLoggedUser() {
        let sessionInfo = this.getSessionInfo(this.getAuthToken());
        return new Promise((resolve, reject) => {
            this.usersService.getById(sessionInfo.id).subscribe((res: any) => {
                resolve(res), reject(res);
            });
        });
    }
}
