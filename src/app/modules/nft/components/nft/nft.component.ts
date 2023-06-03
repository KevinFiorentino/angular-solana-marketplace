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

  public tokenMint!: PublicKey;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private solanaNftService: SolanaNftService,
  ) { }

  ngOnInit(): void {
    const tm = this.route.snapshot.paramMap.get('tokenMint');
    if (!tm) {
      this.router.navigate(['/collections']);
      return;
    }
    this.tokenMint = new PublicKey(tm);
    this.getNFT();
  }

  getNFT(): void {
    this.solanaNftService.getTokenFromSolana(this.tokenMint)
      .then(token => {
        console.log(token);
      });
  }

}
