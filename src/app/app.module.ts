import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './modules/app.layout.module';
import { NotfoundComponent } from './modules/auth/notfound/notfound.component';
import { ProductService } from './shared/services/demo_services/product.service';
import { CountryService } from './shared/services/demo_services/country.service';
import { CustomerService } from './shared/services/demo_services/customer.service';
import { EventService } from './shared/services/demo_services/event.service';
import { IconService } from './shared/services/demo_services/icon.service';
import { NodeService } from './shared/services/demo_services/node.service';
import { PhotoService } from './shared/services/demo_services/photo.service';

import { HttpHeadersInterceptor } from '@core/interceptors/http-headers.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule, HttpClientModule],
    providers: [
        MessageService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        CookieService,
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpHeadersInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
