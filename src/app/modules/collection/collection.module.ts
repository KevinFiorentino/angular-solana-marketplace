import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionRoutingModule } from './collection-routing.module';

import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';

import { CollectionComponent } from './components/collection/collection.component';

@NgModule({
  declarations: [
    CollectionComponent
  ],
  imports: [
    CommonModule,
    CollectionRoutingModule,
    MaterialModule,
    SharedModule,
  ]
})
export class CollectionModule { }
