import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SolanaNftService } from '@shared/services/solana-contracts/solana-nft.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-nft-to-collection',
  templateUrl: './add-nft-to-collection.component.html',
  styleUrls: ['./add-nft-to-collection.component.scss']
})
export class AddNftToCollectionComponent implements OnInit {

  public form: UntypedFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  public fileBuffer!: any;
  public originalName = '';
  public ext = '';
  public errorImage = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private solanaNftService: SolanaNftService,
    private dialog: MatDialogRef<AddNftToCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  addNFT(): void {
    this.errorImage = false;
    if (!this.fileBuffer) {
      this.errorImage = true;
      return;
    }
    if (this.form.valid) {

    }
  }

  onFileSelected(): void {
    this.errorImage = false;
    const inputNode: any = document.querySelector('#file');
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileBuffer = e.target.result;
      };
      this.originalName = inputNode.files[0].name;
      this.ext = inputNode.files[0].name.split('.')[inputNode.files[0].name.split('.').length-1];
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  closeModal(): void {
    this.dialog.close();
  }

}
