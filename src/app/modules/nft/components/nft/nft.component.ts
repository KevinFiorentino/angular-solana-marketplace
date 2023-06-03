import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolanaNftService } from '@shared/services/solana-contracts/solana-nft.service';
import { PublicKey } from '@solana/web3.js';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.scss']
})
export class NftComponent implements OnInit {

  public address!: string | null;
  public tokenMint!: PublicKey;
  public nft!: any;

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
      this.getTokenFromSolana();
    }
    catch {
      this.invalidAddress = true;
    }
  }

  getTokenFromSolana(): void {
    this.solanaNftService.getTokenFromSolana(this.tokenMint)
      .then(token => {
        console.log(token);
      })
      .catch(err => {
        console.log('Err', err.message);
      });
  }

}
