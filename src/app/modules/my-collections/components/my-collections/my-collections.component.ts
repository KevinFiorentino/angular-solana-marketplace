import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PublicKey } from '@solana/web3.js';
import { PhantomConnectService } from '@shared/services/phantom/phantom-connect.service';
import { SolanaNftService } from '@shared/services/solana-contracts/solana-nft.service';
import { NewCollectionComponent } from '@shared/components/@modals/new-collection/new-collection.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.scss']
})
export class MyCollectionsComponent implements OnInit, OnDestroy {

  public loading = true;
  public collections!: any[];

  public walletAddress!: string;
  public walletSub!: Subscription;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
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
        if (this.walletAddress)
          this.getUserCollections(new PublicKey(this.walletAddress));
        else
          this.loading = false;
      });
  }

  getUserCollections(pk: PublicKey): void {
    this.loading = true
    this.solanaNftService.getCollectionsByOwner(pk)
      .then(collections => {
        this.collections = collections;
        this.loading = false;
        console.log('collections', collections);
      });
  }

  newCollection(): void {
    this.dialog.open(NewCollectionComponent, {
      data: {
        callback: this.newCollectionCallback.bind(this)
      }
    });
  }

  newCollectionCallback(tx: string): void {
    this.snackBar.open(`Tx Id: ${tx}`, 'Close', {
      duration: 7000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['app-alert-success']
    });
  }

}
