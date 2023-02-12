import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@shared/shared.module';

import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { AccessComponent } from './access/access.component';

@NgModule({
    declarations: [LoginComponent, ErrorComponent, AccessComponent],
    imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
