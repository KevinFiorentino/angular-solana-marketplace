import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SolanaNftService } from '@shared/services/solana-contracts/solana-nft.service';
import { NewCollectionComponent } from '@shared/components/new-collection/new-collection.component';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  public collections!: any[];

  constructor(
    private dialog: MatDialog,
    private solanaNftService: SolanaNftService,
  ) { }

  ngOnInit(): void {
    this.getAllCollections();
  }

  getAllCollections(): void {

  }

  newCollectionCallback(): void {

  }

  newCollection(): void {
    this.dialog.open(NewCollectionComponent, {
      data: {
        callback: this.newCollectionCallback.bind(this)
      }
    });
  }


}
