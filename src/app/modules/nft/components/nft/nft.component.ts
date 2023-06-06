import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '@shared/services/utils.service';
import { SolanaNftService } from '@shared/services/solana-contracts/solana-nft.service';
import { PublicKey } from '@solana/web3.js';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.scss']
})
export class NftComponent implements OnInit {

  public loading = true;

  public address!: string | null;
  public tokenMint!: PublicKey;

  public nft!: any;
  public metadataRaw!: string;

  public invalidAddress = false;

  constructor(
    public utils: UtilsService,
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
      this.getTokenFromSolana();
    }
    catch {
      this.invalidAddress = true;
      this.loading = false;
    }
  }

  getTokenFromSolana(): void {
    this.solanaNftService.getTokenFromSolana(this.tokenMint)
      .then(nft => {
        this.nft = nft;
        this.metadataRaw = JSON.stringify(nft.json, null, 4)
        this.loading = false;
        console.log('nft', nft);
      })
      .catch(err => {
        this.loading = false;
        console.log('Err', err.message);
      });
  }

}
