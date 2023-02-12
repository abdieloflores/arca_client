import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

//PrimeNG elements
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule,
        ButtonModule,
        CheckboxModule,
        PasswordModule,
        InputTextModule,
        ReactiveFormsModule,
        FormsModule,
        MessagesModule,
        MessageModule,
        ToastModule,
    ],
    exports: [
        CommonModule,
        RouterModule,
        ButtonModule,
        CheckboxModule,
        PasswordModule,
        InputTextModule,
        ReactiveFormsModule,
        FormsModule,
        MessagesModule,
        MessageModule,
        ToastModule,
    ],
})
export class SharedModule {}
