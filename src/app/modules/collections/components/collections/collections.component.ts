import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhantomConnectService } from '@shared/services/phantom/phantom-connect.service';
import { SolanaNftService } from '@shared/services/solana-contracts/solana-nft.service';
import { NewCollectionComponent } from '@shared/components/@modals/new-collection/new-collection.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

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
    this.getAllCollections();
    this.listenPhantomWallet();
  }

  listenPhantomWallet(): void {
    this.walletSub = this.phantom.listenPublicKey
      .subscribe(pk => {
        this.walletAddress = pk ? pk.toString() : '';
      });
  }

  getAllCollections(): void {
    this.solanaNftService.getAllCollections()
      .then(collections => {
        this.collections = collections;
        this.loading = false;
        console.log('collections', this.collections);
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

  newCollection(): void {
    this.dialog.open(NewCollectionComponent, {
      data: {
        callback: this.newCollectionCallback.bind(this)
      }
    });
  }


}
