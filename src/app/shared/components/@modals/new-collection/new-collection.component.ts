import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolanaNftService } from '@shared/services/solana-contracts/solana-nft.service';
import { IpfsService } from '@shared/services/ipfs.service';

@Component({
  selector: 'app-new-collection',
  templateUrl: './new-collection.component.html',
  styleUrls: ['./new-collection.component.scss']
})
export class NewCollectionComponent {

  public loading = false;

  public form: UntypedFormGroup = this.formBuilder.group({
    name: ['NFTCollection', Validators.required],
    symbol: ['NFTC', Validators.required],
    description: ['My collection...', Validators.required],
  });

  public fileBuffer!: Buffer;
  public originalName = '';
  public errorImage = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private solanaNftService: SolanaNftService,
    private ipfsService: IpfsService,
    private dialog: MatDialogRef<NewCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  async newCollection() {
    this.errorImage = false;
    if (!this.fileBuffer) {
      this.errorImage = true;
      return;
    }
    if (this.form.valid) {
      // Step 1: Upload image to IPFS
      // const ipfsImage = await this.ipfsService.addBufferFile(this.fileBuffer);
      const ipfsImageHash = 'QmTsRxRpmWgc5rtaRkE77MYbp3qS3Qsjb7CiYmSSVmhF4V'; // ipfsImage.path;
      const ipfsImageUri = this.ipfsService.buildFilePath(ipfsImageHash);

      // Step 2: Create off-chain Metadata
      const metadata = this.solanaNftService.buildMetadataJSON(
        this.form.get('name')?.value,
        this.form.get('symbol')?.value,
        this.form.get('description')?.value,
        ipfsImageUri,
        'collection',
      );
      console.log('metadata', metadata);

      // Step 3: Upload off-chain Metadata to IPFS
      // const ipfsMetadata = await this.ipfsService.addJsonFile(metadata);
      const ipfsMetadataHash = 'QmQkWBkXqYvTSzHJmhmMD9B43NHBW6ybbKc1h2fbxr9LiE'; // ipfsMetadata.path;
      const ipfsMetadataUri = this.ipfsService.buildFilePath(ipfsMetadataHash);
      console.log('ipfsMetadataUri', ipfsMetadataUri);

      // Step 4: Create collection on Solana
      await this.solanaNftService.mintCollection({
        collectionName: this.form.get('name')?.value,
        collectionSymbol: this.form.get('symbol')?.value,
        ipfsImageHash: ipfsImageHash,
        metadataUri: ipfsMetadataUri,
      }).then(tx => {
        this.loading = false;
        this.data.callback(tx);
        this.closeModal();
      }).catch(err => {
        this.loading = false;
      });
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
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  closeModal(): void {
    this.dialog.close();
  }

}
