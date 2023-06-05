import { Component, Input, OnInit } from '@angular/core';
import { IpfsService } from '@shared/services/ipfs.service';

@Component({
  selector: 'app-nft-card',
  templateUrl: './nft-card.component.html',
  styleUrls: ['./nft-card.component.scss']
})
export class NftCardComponent implements OnInit {

  @Input() nft!: any;

  public tokenMint!: string;

  constructor(
    public ipfs: IpfsService
  ) { }

  ngOnInit(): void {
    console.log('collection', this.nft);
    this.tokenMint = this.nft.account.tokenMint.toString();
  }

}
