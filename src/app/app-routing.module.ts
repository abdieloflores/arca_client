import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './modules/auth/notfound/notfound.component';
import { AppLayoutComponent } from './modules/app.layout.component';
import { LoginGuard } from '@core/guards/login.guard';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth',
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/auth/auth.module').then((m) => m.AuthModule),
        canActivate: [LoginGuard],
    },
    {
        path: 'dashboard',
        component: AppLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () =>
                    import(
                        './shared/components/dashboard/dashboard.module'
                    ).then((m) => m.DashboardModule),
            },
            {
                path: 'uikit',
                loadChildren: () =>
                    import('./shared/components/uikit/uikit.module').then(
                        (m) => m.UIkitModule
                    ),
            },
            {
                path: 'utilities',
                loadChildren: () =>
                    import(
                        './shared/components/utilities/utilities.module'
                    ).then((m) => m.UtilitiesModule),
            },
            {
                path: 'documentation',
                loadChildren: () =>
                    import(
                        './shared/components/documentation/documentation.module'
                    ).then((m) => m.DocumentationModule),
            },
            {
                path: 'blocks',
                loadChildren: () =>
                    import(
                        './shared/components/primeblocks/primeblocks.module'
                    ).then((m) => m.PrimeBlocksModule),
            },
            {
                path: 'pages',
                loadChildren: () =>
                    import('./shared/components/pages/pages.module').then(
                        (m) => m.PagesModule
                    ),
            },
        ],
    },
    {
        path: 'landing',
        loadChildren: () =>
            import('./shared/components/landing/landing.module').then(
                (m) => m.LandingModule
            ),
    },
    {
        path: '**',
        pathMatch: 'full',
        component: NotfoundComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
            onSameUrlNavigation: 'reload',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
