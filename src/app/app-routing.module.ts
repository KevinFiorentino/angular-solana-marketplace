import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'collection',
    loadChildren: () => import('./modules/collection/collection.module').then(m => m.CollectionModule),
  },
  {
    path: 'collections',
    loadChildren: () => import('./modules/collections/collections.module').then(m => m.CollectionsModule),
  },
  {
    path: 'my-collections',
    loadChildren: () => import('./modules/my-collections/my-collections.module').then(m => m.MyCollectionsModule),
  },
  {
    path: 'nft',
    loadChildren: () => import('./modules/nft/nft.module').then(m => m.NftModule),
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
