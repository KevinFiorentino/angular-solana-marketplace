import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicKey } from '@solana/web3.js';
import { SolanaNftService } from '@shared/services/solana-contracts/solana-nft.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  public address!: string | null;
  public tokenMint!: PublicKey;
  public collectionPDA!: PublicKey;

  public collection!: any;
  public nfts!: any;

  public invalidAddress = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private solanaNftService: SolanaNftService,
  ) { }

  ngOnInit(): void {
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
    }
  }

  getCollection(): void {
    this.solanaNftService.getCollectionByMint(this.tokenMint)
      .then(collection => {
        console.log('collection', collection);
        if (collection.length > 0) {
          const owner = (collection[0].account as any).owner as PublicKey;
          this.collectionPDA = this.solanaNftService.getCollectionPDA(owner, this.tokenMint);
          this.getNftFromCollection();
        }
      });
  }

  getNftFromCollection(): void {
    this.solanaNftService.getNftsByCollectionPDA(this.collectionPDA)
      .then(nfts => {
        console.log('nfts', nfts);
      });
  }

}
