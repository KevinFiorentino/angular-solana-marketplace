import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyNftsRoutingModule } from './my-nfts-routing.module';

import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';

import { MyNftsComponent } from './components/my-nfts/my-nfts.component';

@NgModule({
  declarations: [
    MyNftsComponent
  ],
  imports: [
    CommonModule,
    MyNftsRoutingModule,
    MaterialModule,
    SharedModule,
  ]
})
export class MyNftsModule { }
