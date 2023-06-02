import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.scss']
})
export class CollectionCardComponent implements OnInit {

  @Input() collection!: any;

  public tokenMint!: string;

  constructor() { }

  ngOnInit(): void {
    console.log('collection', this.collection);
    this.tokenMint = this.collection.publicKey.toString();
  }

}
