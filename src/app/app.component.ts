import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutService } from 'src/app/shared/services/app.layout.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(
        public layoutService: LayoutService,
        private primengConfig: PrimeNGConfig
    ) {
        this.selectTheme();
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }

    selectTheme() {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.changeTheme('vela-blue', 'dark');
        } else {
            this.changeTheme('saga-blue', 'ligth');
        }
    }

    changeTheme(theme: string, colorScheme: string) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const newHref = themeLink
            .getAttribute('href')!
            .replace(this.layoutService.config.theme, theme);
        this.layoutService.config.colorScheme;
        this.replaceThemeLink(newHref, () => {
            this.layoutService.config.theme = theme;
            this.layoutService.config.colorScheme = colorScheme;
            this.layoutService.onConfigUpdate();
        });
    }

    replaceThemeLink(href: string, onComplete: Function) {
        const id = 'theme-css';
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode!.insertBefore(
            cloneLinkElement,
            themeLink.nextSibling
        );

        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
            onComplete();
        });
    }
}
