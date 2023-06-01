export type ExternalUrl = 'https://queenbe.io' | 'https://maular.com' | null;
export type ProjectName = 'queenbe';
export type TokenType = 'token' | 'collection' | 'nft';       // token = fungible token

export interface TokenMetadataStandard {
  // Metaplex Metadata Recommended - https://docs.metaplex.com/programs/token-metadata/token-standard#the-fungible-standard
  name: string;
  symbol: string;
  description: string;
  image: string;
  external_url: ExternalUrl;
  // Custom Metadata
  project: ProjectName;
  type: TokenType;
  ipfsImageHash: string;
  data: any;                  // Custom data, certificates, vouchers, anything
}
