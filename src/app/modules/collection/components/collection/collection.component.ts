import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PublicKey } from '@solana/web3.js';
import { PhantomConnectService } from '@shared/services/phantom/phantom-connect.service';
import { SolanaNftService } from '@shared/services/solana-contracts/solana-nft.service';
import { AddNftToCollectionComponent } from '@shared/components/@modals/add-nft-to-collection/add-nft-to-collection.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  public loading = true;

  public address!: string | null;
  public tokenMint!: PublicKey;
  public collectionPDA!: PublicKey;

  public collection!: any;
  public nfts!: any;

  public invalidAddress = false;

  public walletAddress!: string;
  public walletSub!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private phantom: PhantomConnectService,
    private solanaNftService: SolanaNftService,
  ) { }

  ngOnInit(): void {
    this.listenPhantomWallet();
    this.address = this.route.snapshot.paramMap.get('tokenMint');
    if (!this.address) {
      this.router.navigate(['/collections']);
      return;
    }
    try {
      this.tokenMint = new PublicKey(this.address);
      this.getCollection();
    }
    catch {
      this.invalidAddress = true;
      this.loading = false;
    }
  }

  listenPhantomWallet(): void {
    this.walletSub = this.phantom.listenPublicKey
      .subscribe(pk => {
        this.walletAddress = pk ? pk.toString() : '';
      });
  }

  getCollection(): void {
    this.solanaNftService.getCollectionByMint(this.tokenMint)
      .then(collection => {
        console.log('collection', collection);
        if (collection.length > 0) {
          const owner = (collection[0].account as any).owner as PublicKey;
          this.collectionPDA = this.solanaNftService.getCollectionPDA(owner, this.tokenMint);
          this.collection = collection[0];
          this.getNftFromCollection();
        }
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        console.log('Err', err.message);
      });
  }

  getNftFromCollection(): void {
    this.solanaNftService.getNftsByCollectionPDA(this.collectionPDA)
      .then(nfts => {
        console.log('nfts', nfts);
      });
  }

  mintFromCollection(): void {
    this.dialog.open(AddNftToCollectionComponent, {
      data: {
        collectionMint: this.tokenMint,
        collectionSymbol: this.collection.account.symbol,
        callback: this.mintFromCollectionCallback.bind(this)
      }
    });
  }

  mintFromCollectionCallback(tx: string): void {
    this.snackBar.open(`Tx Id: ${tx}`, 'Close', {
      duration: 7000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['app-alert-success']
    });
  }

}
