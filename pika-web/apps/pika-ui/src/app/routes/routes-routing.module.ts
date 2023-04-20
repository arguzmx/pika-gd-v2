import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadOptionalModules } from "@delon/theme";

const routes: Routes = [
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
