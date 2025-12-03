import { Routes } from '@angular/router';
import { Kiosk } from './components/kiosk/kiosk';
import { Admin } from './components/admin/admin';
import { Display } from './components/display/display';

export const routes: Routes = [
  { path: '', redirectTo: 'kiosk', pathMatch: 'full' }, 
  { path: 'kiosk', component: Kiosk },
  { path: 'admin', component: Admin },
  { path: 'display', component: Display }
];