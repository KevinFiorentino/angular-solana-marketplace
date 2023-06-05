import { Component, Input, OnInit } from '@angular/core';
import { IpfsService } from '@shared/services/ipfs.service';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.scss']
})
export class CollectionCardComponent implements OnInit {

  @Input() collection!: any;

  public tokenMint!: string;

  constructor(
    public ipfs: IpfsService
  ) { }

  ngOnInit(): void {
    console.log('collection', this.collection);
    this.tokenMint = this.collection.account.tokenMint.toString();
  }

}
