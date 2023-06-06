export type SolanaNft = {
  'version': '0.1.0',
  'name': 'solana_nft',
  'instructions': [
    {
      'name': 'mintCollection',
      'accounts': [
        {
          'name': 'mint',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'mintAuthority',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'payer',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'associatedTokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenMetadataProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'masterEdition',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'metadata',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'collectionAuthorityRecord',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'collectionPda',
          'isMut': true,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'collectionName',
          'type': 'string'
        },
        {
          'name': 'collectionSymbol',
          'type': 'string'
        },
        {
          'name': 'ipfsImageHash',
          'type': 'string'
        },
        {
          'name': 'metadataUri',
          'type': 'string'
        }
      ]
    },
    {
      'name': 'mintNftFromCollection',
      'accounts': [
        {
          'name': 'mint',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'mintAuthority',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'payer',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'associatedTokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenMetadataProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'nftPda',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'masterEdition',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'metadata',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'collectionTokenMint',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'collectionPda',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'collectionMetadata',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'collectionMasterEd',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'collectionAuthorityRecord',
          'isMut': true,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'nftName',
          'type': 'string'
        },
        {
          'name': 'ipfsImageHash',
          'type': 'string'
        },
        {
          'name': 'metadataUri',
          'type': 'string'
        }
      ]
    }
  ],
  'accounts': [
    {
      'name': 'collectionAccount',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'owner',
            'type': 'publicKey'
          },
          {
            'name': 'tokenMint',
            'type': 'publicKey'
          },
          {
            'name': 'name',
            'type': 'string'
          },
          {
            'name': 'symbol',
            'type': 'string'
          },
          {
            'name': 'ipfsImageHash',
            'type': 'string'
          },
          {
            'name': 'bump',
            'type': 'u8'
          },
          {
            'name': 'created',
            'type': 'i64'
          }
        ]
      }
    },
    {
      'name': 'nftAccount',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'tokenMint',
            'type': 'publicKey'
          },
          {
            'name': 'collectionMint',
            'type': 'publicKey'
          },
          {
            'name': 'name',
            'type': 'string'
          },
          {
            'name': 'ipfsImageHash',
            'type': 'string'
          },
          {
            'name': 'created',
            'type': 'i64'
          }
        ]
      }
    }
  ],
  'metadata': {
    'address': '756vNUvmmyKCimqoQGtHAMexYsadsDsPG5ieL2KXfbfp'
  }
};

export const IDL: SolanaNft = {
  'version': '0.1.0',
  'name': 'solana_nft',
  'instructions': [
    {
      'name': 'mintCollection',
      'accounts': [
        {
          'name': 'mint',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'mintAuthority',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'payer',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'associatedTokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenMetadataProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'masterEdition',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'metadata',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'collectionAuthorityRecord',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'collectionPda',
          'isMut': true,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'collectionName',
          'type': 'string'
        },
        {
          'name': 'collectionSymbol',
          'type': 'string'
        },
        {
          'name': 'ipfsImageHash',
          'type': 'string'
        },
        {
          'name': 'metadataUri',
          'type': 'string'
        }
      ]
    },
    {
      'name': 'mintNftFromCollection',
      'accounts': [
        {
          'name': 'mint',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'mintAuthority',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'payer',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'associatedTokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenMetadataProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'nftPda',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'masterEdition',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'metadata',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'collectionTokenMint',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'collectionPda',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'collectionMetadata',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'collectionMasterEd',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'collectionAuthorityRecord',
          'isMut': true,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'nftName',
          'type': 'string'
        },
        {
          'name': 'ipfsImageHash',
          'type': 'string'
        },
        {
          'name': 'metadataUri',
          'type': 'string'
        }
      ]
    }
  ],
  'accounts': [
    {
      'name': 'collectionAccount',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'owner',
            'type': 'publicKey'
          },
          {
            'name': 'tokenMint',
            'type': 'publicKey'
          },
          {
            'name': 'name',
            'type': 'string'
          },
          {
            'name': 'symbol',
            'type': 'string'
          },
          {
            'name': 'ipfsImageHash',
            'type': 'string'
          },
          {
            'name': 'bump',
            'type': 'u8'
          },
          {
            'name': 'created',
            'type': 'i64'
          }
        ]
      }
    },
    {
      'name': 'nftAccount',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'tokenMint',
            'type': 'publicKey'
          },
          {
            'name': 'collectionMint',
            'type': 'publicKey'
          },
          {
            'name': 'name',
            'type': 'string'
          },
          {
            'name': 'ipfsImageHash',
            'type': 'string'
          },
          {
            'name': 'created',
            'type': 'i64'
          }
        ]
      }
    }
  ],
  'metadata': {
    'address': '756vNUvmmyKCimqoQGtHAMexYsadsDsPG5ieL2KXfbfp'
  }
};
