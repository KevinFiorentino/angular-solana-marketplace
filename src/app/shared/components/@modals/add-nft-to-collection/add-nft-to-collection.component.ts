import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-nft-to-collection',
  templateUrl: './add-nft-to-collection.component.html',
  styleUrls: ['./add-nft-to-collection.component.scss']
})
export class AddNftToCollectionComponent implements OnInit {

  form: UntypedFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialogRef<AddNftToCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  addNFT(): void {

  }

  closeModal(): void {
    this.dialog.close();
  }

}
