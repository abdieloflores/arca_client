import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    private URL = environment.apiUrl;
    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get(`${this.URL}/usuarios`);
    }

    getById(id: number) {
        return this.http.get(`${this.URL}/usuarios/${id}`);
    }

    getByIdNoAuth(id: number, token: string) {
        return this.http.get(`${this.URL}/usuarios/${id}`, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`,
            }),
        });
    }

    save(user: FormData) {
        if (user.get('usuarioid')) {
            return this.http.put(
                `${this.URL}/usuarios/${user.get('usuarioid')}`,
                user
            );
        } else {
            return this.http.post(`${this.URL}/usuarios`, user);
        }
    }

    delete(id: number) {
        return this.http.delete(`${this.URL}/usuarios/${id}`);
    }

    exist(ref: string) {
        return this.http.post(`${this.URL}/usuarios/exist`, { ref: ref });
    }

    existUsuario(ref: string) {
        return this.http.post(`${this.URL}/usuarios/exist-usuario`, {
            ref: ref,
        });
    }
}
