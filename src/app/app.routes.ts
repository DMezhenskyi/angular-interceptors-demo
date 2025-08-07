import { Routes } from '@angular/router';
import { CoursesPage } from './courses/courses-page';
import { AdminPage } from './admin/admin-page';

export const routes: Routes = [
  { path: '', component: CoursesPage },
  {
    path: 'admin',
    component: AdminPage,
  },
];
