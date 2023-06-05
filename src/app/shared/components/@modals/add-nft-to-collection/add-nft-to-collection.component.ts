import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PublicKey } from '@metaplex-foundation/js';
import { SolanaNftService } from '@shared/services/solana-contracts/solana-nft.service';
import { IpfsService } from '@shared/services/ipfs.service';

@Component({
  selector: 'app-add-nft-to-collection',
  templateUrl: './add-nft-to-collection.component.html',
  styleUrls: ['./add-nft-to-collection.component.scss']
})
export class AddNftToCollectionComponent implements OnInit {

  public loading = false;

  public form: UntypedFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  public fileBuffer!: Buffer;
  public originalName = '';
  public errorImage = false;

  private collectionMint!: PublicKey;

  public collectionSymbol!: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private solanaNftService: SolanaNftService,
    private ipfsService: IpfsService,
    private dialog: MatDialogRef<AddNftToCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log('this.data', this.data);
    this.collectionMint = this.data.collectionMint;
    this.collectionSymbol = this.data.collectionSymbol
  }

  async addNFT() {
    this.errorImage = false;
    if (!this.fileBuffer) {
      this.errorImage = true;
      return;
    }
    if (this.form.valid) {
      // Step 1: Upload image to IPFS
      // const ipfsImage = await this.ipfsService.addBufferFile(this.fileBuffer);
      const ipfsImageHash = 'QmTsRxRpmWgc5rtaRkE77MYbp3qS3Qsjb7CiYmSSVmhF4V' // ipfsImage.path;
      const ipfsImageUri = this.ipfsService.buildFilePath(ipfsImageHash);

      // Step 2: Create off-chain Metadata
      const metadata = this.solanaNftService.buildMetadataJSON(
        this.form.get('name')?.value,
        this.collectionSymbol,                                    // Each NFT will have the same symbol as the collection
        this.form.get('description')?.value,
        ipfsImageUri,
        'nft',
      );
      console.log('metadata', metadata);

      // Step 3: Upload off-chain Metadata to IPFS
      const ipfsMetadata = await this.ipfsService.addJsonFile(metadata);
      const ipfsMetadataHash = ipfsMetadata.path;
      const ipfsMetadataUri = this.ipfsService.buildFilePath(ipfsMetadataHash);
      console.log('ipfsMetadataUri', ipfsMetadataUri);

      await this.solanaNftService.mintNftFromCollection(
        this.collectionMint,
        {
          nftName: this.form.get('name')?.value,
          ipfsImageHash: ipfsImageHash,
          metadataUri: ipfsMetadataUri,
        }
      ).then(tx => {
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
