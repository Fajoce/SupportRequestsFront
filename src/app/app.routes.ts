import { Routes } from '@angular/router';
import { RequestList } from './features/support-requests/pages/request-list/request-list';
import { RequestCreate } from './features/support-requests/pages/request-create/request-create';
import { RequestDetail } from './features/support-requests/pages/request-detail/request-detail';

export const routes: Routes = [
  {
    path: '',
    component: RequestList,
  },
  {
    path: 'create',
    component: RequestCreate,
  },
  {
    path: 'detail/:id',
    component: RequestDetail,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
