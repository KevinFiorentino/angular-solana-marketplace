import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCollectionsRoutingModule } from './my-collections-routing.module';

import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';

import { MyCollectionsComponent } from './components/my-collections/my-collections.component';

@NgModule({
  declarations: [
    MyCollectionsComponent
  ],
  imports: [
    CommonModule,
    MyCollectionsRoutingModule,
    MaterialModule,
    SharedModule,
  ]
})
export class MyCollectionsModule { }
