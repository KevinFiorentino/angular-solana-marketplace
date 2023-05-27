import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@material/material.module';

import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CollectionCardComponent } from './components/@cards/collection-card/collection-card.component';
import { NftCardComponent } from './components/@cards/nft-card/nft-card.component';
import { AddNftToCollectionComponent } from './components/@modals/add-nft-to-collection/add-nft-to-collection.component';
import { NewCollectionComponent } from './components/@modals/new-collection/new-collection.component';

const COMPONENTS = [
  FooterComponent,
  NavBarComponent,
  CollectionCardComponent,
  NftCardComponent,
  AddNftToCollectionComponent,
  NewCollectionComponent,
]

@NgModule({
  declarations: [
    COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    COMPONENTS
  ],
  providers: []
})
export class SharedModule { }
