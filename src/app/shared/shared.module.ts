import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@material/material.module';

import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NewCollectionComponent } from './components/new-collection/new-collection.component';

const COMPONENTS = [
  FooterComponent,
  NavBarComponent,
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
