import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolanaNftService } from '@shared/services/solana-contracts/solana-nft.service';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.scss']
})
export class NftComponent implements OnInit {

  public tokenMint!: string | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private solanaNftService: SolanaNftService,
  ) { }

  ngOnInit(): void {
    this.tokenMint = this.route.snapshot.paramMap.get('tokenMint');
    console.log('this.tokenMint', this.tokenMint);
    if (!this.tokenMint)
      this.router.navigate(['/collections']);
    else
      this.getNFT();
  }

  getNFT(): void {

  }

}
