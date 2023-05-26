import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhantomConnectService } from '@shared/services/phantom/phantom-connect.service';
import { SolanaNftService } from '@shared/services/solana-contracts/solana-nft.service';
import { NewCollectionComponent } from '@shared/components/new-collection/new-collection.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.scss']
})
export class MyCollectionsComponent implements OnInit, OnDestroy {

  public walletAddress!: string;
  public walletSub!: Subscription;

  constructor(
    private dialog: MatDialog,
    private phantom: PhantomConnectService,
    private solanaNftService: SolanaNftService,
  ) { }

  ngOnInit(): void {
    this.listenPhantomWallet();
  }

  ngOnDestroy(): void {
    if (this.walletSub) { this.walletSub.unsubscribe(); }
  }

  listenPhantomWallet(): void {
    this.walletSub = this.phantom.listenPublicKey
      .subscribe(pk => {
        this.walletAddress = pk ? pk.toString() : '';
        this.getUserCollections();
      });
  }

  getUserCollections(): void {

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
