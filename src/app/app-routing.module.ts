import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'collections',
    loadChildren: () => import('./modules/collections/collections.module').then(m => m.CollectionsModule),
  },
  {
    path: 'my-nfts',
    loadChildren: () => import('./modules/my-nfts/my-nfts.module').then(m => m.MyNftsModule),
  },
  {
    path: '',
    loadChildren: () => import('./modules/collections/collections.module').then(m => m.CollectionsModule),
  },
  {
    path: '**',
    redirectTo: 'collections'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
