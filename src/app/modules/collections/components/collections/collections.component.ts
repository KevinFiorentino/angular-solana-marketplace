import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewCollectionComponent } from '@shared/components/new-collection/new-collection.component';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  newCollection(): void {
    this.dialog.open(NewCollectionComponent, {
      data: {
        callback: {}
      }
    });
  }

}
