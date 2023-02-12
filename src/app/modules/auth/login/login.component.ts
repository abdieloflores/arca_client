import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/shared/services/app.layout.service';
import { AuthService } from '@shared/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public loginForm: FormGroup;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private messageService: MessageService
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    navigate(page: String) {
        this.router.navigate([page]);
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.authService.signIn(this.loginForm.value).subscribe({
                next: (res: any) => {
                    const sessionInfo = this.authService.getSessionInfo(
                        res.token
                    );
                    this.authService.setAuthToken(res.token);
                    this.router.navigate(['dashboard']);
                },
                error: (res: any) => {
                    console.log(res);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'El usuario o la contraseña son incorrectos, intentalo de nuevo.',
                    });
                },
            });
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Todos los campos son obligatorios.',
            });
        }
    }
}
