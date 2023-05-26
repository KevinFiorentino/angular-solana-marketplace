import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolanaNftService } from '@shared/services/solana-contracts/solana-nft.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  public tokenMint!: string | null;
  public collection!: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private solanaNftService: SolanaNftService,
  ) { }

  ngOnInit(): void {
    this.tokenMint = this.route.snapshot.paramMap.get('tokenMint');
    if (this.tokenMint)
      this.router.navigate(['/collections']);
    else
      this.getCollection();
  }

  getCollection(): void {

  }

}
