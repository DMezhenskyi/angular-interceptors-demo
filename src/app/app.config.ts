import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { Auth } from './core/auth/auth';
import { authInterceptor } from './core/auth/auth-interceptor';
import { globalHttpErrorInterceptor } from './core/http/global-http-error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAppInitializer(() => inject(Auth).authenticateDummyUser()),
    provideHttpClient(
      withInterceptors([
        globalHttpErrorInterceptor
      ])
    ),
    provideRouter(routes)
  ]
};
