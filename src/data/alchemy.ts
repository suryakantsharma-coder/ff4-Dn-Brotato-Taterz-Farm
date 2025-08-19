const API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string;

export interface NftItem {
  contract: {
    address: string;
    name: string;
    symbol: string;
    totalSupply: number | null;
    tokenType: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    openSeaMetadata: {
      floorPrice: number;
      collectionName: string;
      collectionSlug: string;
      safelistRequestStatus: string;
      imageUrl: string;
      description: string;
      externalUrl: string | null;
      twitterUsername: string | null;
      discordUrl: string | null;
      bannerImageUrl: string | null;
      lastIngestedAt: string;
    };
    isSpam: boolean | null;
    spamClassifications: string[];
  };
  tokenId: string;
  tokenType: string;
  name: string;
  description: string;
  tokenUri: string;
  image: {
    cachedUrl: string;
    thumbnailUrl: string | null;
    pngUrl: string | null;
    contentType: string | null;
    size: number | null;
    originalUrl: string;
  };
  raw: {
    tokenUri: string;
    metadata: {
      image: string;
      external_url: string;
      is_normalized: boolean;
      image_url: string;
      name: string;
      description: string;
      attributes: {
        value: string | number | boolean;
        trait_type: string;
        display_type?: string;
      }[];
      version: number;
      url: string;
      _extension: {
        ensPrimaryName: string;
        currentOwner: string;
      };
    };
    error: string | null;
  };
  collection: {
    name: string;
    slug: string;
    externalUrl: string | null;
    bannerImageUrl: string | null;
  };
  mint: {
    mintAddress: string | null;
    blockNumber: number | null;
    timestamp: string | null;
    transactionHash: string | null;
  };
  owners: string[] | null;
  timeLastUpdated: string;
  balance: string;
  acquiredAt: {
    blockTimestamp: string | null;
    blockNumber: number | null;
  };
}
export const getUserNfts = async (owner: string): Promise<Array<NftItem>> => {
  try {
    // const url = `https://linea-mainnet.g.alchemy.com/nft/v3/${API_KEY}/getNFTsForOwner?owner=${owner}&contractAddresses[]=0xEa2bE906eE93590bfA8f3c1245130Cb786F8282b&withMetadata=true&pageSize=200`;
    const url = `https://linea-mainnet.g.alchemy.com/nft/v3/${API_KEY}/getNFTsForOwner?owner=${owner}&contractAddresses%5B%5D=0x73cfE12F9876dADF0E049fd75c73740036CE9A9b&pageSize=200`;
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const { ownedNfts } = await response.json();
    return ownedNfts;
  } catch (err) {
    console.error('Failed to fetch NFTs:', err);
    return [];
  }
};

export interface TokenType {
  contractAddress: string;
  tokenId: string;
}
export const getUserNftsByIds = async (tokens: Array<TokenType>): Promise<Array<NftItem>> => {
  // NFT Metadata By Token ID [Batch] (POST /v3/:apiKey/getNFTMetadataBatch)
  const response = await fetch(
    `https://linea-mainnet.g.alchemy.com/nft/v3/${API_KEY}/getNFTMetadataBatch`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokens: [...tokens],
      }),
    },
  );

  const { nfts } = await response.json();
  console.log({ nfts });
  return nfts;
};
