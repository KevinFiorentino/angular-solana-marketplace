import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NftRoutingModule } from './nft-routing.module';

import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';

import { NftComponent } from './components/nft/nft.component';

@NgModule({
  declarations: [
    NftComponent
  ],
  imports: [
    CommonModule,
    NftRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class NftModule { }
