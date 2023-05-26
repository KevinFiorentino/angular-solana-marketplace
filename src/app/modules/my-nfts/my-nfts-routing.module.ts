import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyNftsComponent } from './components/my-nfts/my-nfts.component';

const routes: Routes = [
  { path: '', component: MyNftsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyNftsRoutingModule { }
