import { Injectable } from '@angular/core';
import { Connection, PublicKey, Keypair, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, ComputeBudgetProgram } from '@solana/web3.js';
import { web3, Program, ProgramAccount, getProvider, IdlTypes } from '@project-serum/anchor';
import { getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Metaplex } from '@metaplex-foundation/js';
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { PhantomConnectService } from '@shared/services/phantom/phantom-connect.service';
import { IDL, SolanaNft } from '@shared/idls/solana-nft.idl';
import { MintCollection } from '@shared/models/collection.interface';
import { MintNFT } from '@shared/models/nft.interface';
import { ExternalUrl, TokenType, TokenMetadataStandard } from '@shared/models/metadata.interface';

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
);

// https://spl.solana.com/associated-token-account
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
);

@Injectable({
  providedIn: 'root',
})
export class SolanaNftService {

  private connection: Connection;
  private programID = new PublicKey(IDL.metadata.address);

  constructor(
    private phantom: PhantomConnectService,
  ) {
    this.connection = this.phantom.getConnection();
  }


  /* ****************************************
                  GET NFTs
  **************************************** */

  async getTokenFromSolana(tokenMint: PublicKey) {
    const metaplex = Metaplex.make(this.connection);
    return metaplex.nfts().findByMint({ mintAddress: tokenMint });
  }


  /* ******************************
        COLLECTION FUNCTIONS
  ****************************** */

  async mintCollection(
    collectionData: MintCollection
  ): Promise<string> {

    const provider = getProvider();
    const program = new Program(IDL, this.programID, provider);

    if (!provider || !provider.publicKey)
      throw new Error('User\'s wallet not connected.');

    console.log('provider.publicKey', provider.publicKey.toString());

    // Prepare PDAs
    const collectionKP = Keypair.generate();
    const collectionTokenMint = collectionKP.publicKey;
    const collectionATA = getAssociatedTokenAddressSync(
      collectionTokenMint,
      provider.publicKey,
    );
    const collectionPDA = this.getCollectionPDA(collectionTokenMint);
    const collectionMetadataPDA = this.getMetadataPDA(collectionTokenMint);
    const collectionMasterEditionPDA = this.getMasterEditionPDA(collectionTokenMint);
    const collectionAuthorityRecordPDA = this.getCollectionAuthorityRecordPDA(collectionTokenMint, collectionPDA);

    // Create and sign transaction
    const t = new Transaction();

    const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
      units: 300000
    });
    t.add(modifyComputeUnits);

    const i = await program.methods
      .mintCollection(
        collectionData.collectionName,
        collectionData.collectionSymbol,
        collectionData.ipfsImageHash,
        collectionData.metadataUri,
      )
      .accounts({
        mint: collectionTokenMint,
        mintAuthority: provider.publicKey,
        payer: provider.publicKey,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        tokenAccount: collectionATA,
        associatedTokenProgram: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        masterEdition: collectionMasterEditionPDA,
        metadata: collectionMetadataPDA,
        collectionAuthorityRecord: collectionAuthorityRecordPDA,
        collectionPda: collectionPDA,
      })
      .instruction();

    t.add(i);

    return this.phantom.signAndSendTransactionWeb(t, collectionKP);
  }

  getAllCollections(): Promise<ProgramAccount<IdlTypes<SolanaNft>>[]> {
    const provider = getProvider();
    const program = new Program(IDL, this.programID, provider);
    return program.account.collectionAccount.all();
  }

  getCollectionsByOwner(walletAddress: PublicKey): Promise<ProgramAccount<IdlTypes<SolanaNft>>[]> {
    const provider = getProvider();
    const program = new Program(IDL, this.programID, provider);
    return program.account.collectionAccount.all([{
      memcmp: {
        bytes: walletAddress.toBase58(),
        offset: 8
      }
    }]);
  }

  getCollectionByMint(tokenMint: PublicKey): Promise<ProgramAccount<IdlTypes<SolanaNft>>[]> {
    const provider = getProvider();
    const program = new Program(IDL, this.programID, provider);
    return program.account.collectionAccount.all([{
      memcmp: {
        bytes: tokenMint.toBase58(),
        offset: 40
      }
    }]);
  }


  /* ******************************
           NFTs FUNCTIONS
  ****************************** */

  async mintNftFromCollection(
    collectionTokenMint: PublicKey,
    nftData: MintNFT,
  ) {

    const provider = getProvider();
    const program = new Program(IDL, this.programID, provider);

    if (!provider || !provider.publicKey)
      throw new Error('User\'s wallet not connected.');

    // Prepare Collection PDAs
    const collectionPDA = this.getCollectionPDA(collectionTokenMint);
    const collectionMetadataPDA = this.getMetadataPDA(collectionTokenMint);
    const collectionMasterEditionPDA = this.getMasterEditionPDA(collectionTokenMint);
    const collectionAuthorityRecordPDA = this.getCollectionAuthorityRecordPDA(collectionTokenMint, collectionPDA);

    // Prepare NFTs PDAs
    const nftKP = Keypair.generate();
    const nftTokenMint = nftKP.publicKey;
    const nftATA = getAssociatedTokenAddressSync(
      nftTokenMint,
      provider.publicKey,
    );
    const nftPDA = this.getNftPDA(collectionPDA, nftTokenMint);
    const nftMetadataPDA = this.getMetadataPDA(nftTokenMint);
    const nftMasterEditionPDA = this.getMasterEditionPDA(nftTokenMint);

    // Create and sign transaction
    const t = new Transaction();

    const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
      units: 300000
    });
    t.add(modifyComputeUnits);

    const i = await program.methods
      .mintNftFromCollection(
        nftData.nftName,
        nftData.ipfsImageHash,
        nftData.metadataUri,
      )
      .accounts({
        mint: nftTokenMint,
        mintAuthority: provider.publicKey,
        payer: provider.publicKey,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        tokenAccount: nftATA,
        associatedTokenProgram: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        nftPda: nftPDA,
        masterEdition: nftMasterEditionPDA,
        metadata: nftMetadataPDA,
        collectionTokenMint: collectionTokenMint,
        collectionPda: collectionPDA,
        collectionMetadata: collectionMetadataPDA,
        collectionMasterEd: collectionMasterEditionPDA,
        collectionAuthorityRecord: collectionAuthorityRecordPDA,
      })
      .instruction();

    t.add(i);

    return this.phantom.signAndSendTransactionWeb(t, nftKP);
  }

  getNftsByCollectionMint(collectionMint: PublicKey): Promise<ProgramAccount<IdlTypes<SolanaNft>>[]> {
    const provider = getProvider();
    const program = new Program(IDL, this.programID, provider);
    return program.account.nftAccount.all([{
      memcmp: {
        bytes: collectionMint.toBase58(),
        offset: 40
      }
    }]);
  }


  /* ******************************
         METADATA FUNCTIONS
  ****************************** */

  buildMetadataJSON(
    name: string,
    symbol: string,
    description: string,
    imageURI: string,
    type: TokenType,
    data = {},
    website: ExternalUrl = 'https://queenbe.io',
  ): TokenMetadataStandard {
    return {
      name: name,
      symbol: symbol,
      description: description,
      image: imageURI,
      external_url: website,
      project: 'queenbe',
      type: type,
      data: data,
    };
  }


  /* ******************************
         BUILD METAPLEX PDAs
  ****************************** */

  getMetadataPDA(tokenMint: PublicKey): PublicKey {
    const [metadataPDA] = web3.PublicKey
      .findProgramAddressSync(
        [
          Buffer.from('metadata'),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          tokenMint.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
      );
    return metadataPDA;
  }

  getMasterEditionPDA(tokenMint: PublicKey): PublicKey {
    const [masterEditionPDA] = web3.PublicKey
      .findProgramAddressSync(
        [
          Buffer.from('metadata'),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          tokenMint.toBuffer(),
          Buffer.from('edition'),
        ],
        TOKEN_METADATA_PROGRAM_ID
      );
    return masterEditionPDA;
  }

  getCollectionAuthorityRecordPDA(collectionTokenMint: PublicKey, collectionPDA: PublicKey): PublicKey {
    const [collectionAuthorityRecordPDA] = web3.PublicKey
      .findProgramAddressSync(
        [
          Buffer.from('metadata'),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          collectionTokenMint.toBuffer(),
          Buffer.from('collection_authority'),
          collectionPDA.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
      );
    return collectionAuthorityRecordPDA;
  }


  /* ******************************
          BUILD CUSTOM PDAs
  ****************************** */

  getCollectionPDA(collectionTokenMint: PublicKey): PublicKey {
    const [collectionPDA] = web3.PublicKey
      .findProgramAddressSync(
        [
          Buffer.from('collection'),
          collectionTokenMint.toBuffer(),
        ],
        this.programID
      );
    return collectionPDA;
  }

  getNftPDA(collectionPDA: PublicKey, nftTokenMint: PublicKey): PublicKey {
    const [nftPDA] = web3.PublicKey
      .findProgramAddressSync(
        [
          Buffer.from('nft'),
          collectionPDA.toBuffer(),
          nftTokenMint.toBuffer(),
        ],
        this.programID
      );
    return nftPDA;
  }

}
