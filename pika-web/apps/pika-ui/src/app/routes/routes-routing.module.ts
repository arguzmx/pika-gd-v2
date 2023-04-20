import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadOptionalModules } from "@delon/theme";
import { LayoutBasicComponent } from '../layout/basic/basic.component';
import { startPageGuard } from '../core/start-page.guard';
import { SimpleGuard } from '@delon/auth';

const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [startPageGuard, SimpleGuard],
    canActivateChild: [SimpleGuard],
    data: {},
    children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { preload: true }
      }
    ]
  },
  //passport
  { path: '', loadChildren: () => import('./passport/passport.module').then(m => m.PassportModule), data: { preload: true } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  providers: [PreloadOptionalModules],
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'top',
    preloadingStrategy: PreloadOptionalModules
  })],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
