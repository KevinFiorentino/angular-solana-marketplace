import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NftComponent } from './components/nft/nft.component';

const routes: Routes = [
  { path: ':tokenMint', component: NftComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NftRoutingModule { }
