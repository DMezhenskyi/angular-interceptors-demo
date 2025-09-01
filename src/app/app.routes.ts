import { Routes } from '@angular/router';
import { CoursesPage } from './courses/courses-page';
import { AdminPage } from './admin/admin-page';
import { provideHttpClient, withInterceptors, withRequestsMadeViaParent } from '@angular/common/http';
import { authInterceptor } from './core/auth/auth-interceptor';

export const routes: Routes = [
  { path: '', component: CoursesPage },
  {
    path: 'admin',
    component: AdminPage,
    providers: [
      provideHttpClient(
        withInterceptors([
          authInterceptor
        ]),
        withRequestsMadeViaParent()
      )
    ]
  },
];
