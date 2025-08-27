import { getUserNfts, getUserNftsByIds, NftItem, TokenType } from '@/data/alchemy';
import { useEffect, useState } from 'react';

function useNFT({
  contractAddress,
  address,
  isFetchOnLoad,
  isStakedModal,
}: {
  contractAddress: string;
  address: string;
  isFetchOnLoad: boolean;
  isStakedModal?: boolean;
}) {
  const [data, setData] = useState<Array<NftItem> | undefined>(undefined);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isError, setIsError] = useState({
    isError: false,
    message: '',
  });

  const handleNfts = async () => {
    try {
      if (address && contractAddress) {
        setIsFetching(true);
        const nftsOwnByUsers = await getUserNfts(address);
        setData(nftsOwnByUsers);
        setIsFetching(false);
      } else {
        new Error('Address & Conteract Address is required');
      }
    } catch (err) {
      setIsFetching(false);
      setIsError({
        isError: true,
        message: JSON.stringify(err) || 'Error While Fetching NFTs',
      });
    }
  };

  const handleNftsWithTokenIds = async (tokens: Array<string>) => {
    try {
      if (address && contractAddress) {
        setIsFetching(true);
        const stackedTokens: Array<TokenType> = tokens.map((token) => {
          return {
            contractAddress: contractAddress,
            tokenId: `${token}`,
          };
        });
        const data = await getUserNftsByIds(stackedTokens);
        setData(data);
        setIsFetching(false);
      } else {
        new Error('Address & Conteract Address is required');
      }
    } catch (err) {
      setIsFetching(false);
      setIsError({
        isError: true,
        message: JSON.stringify(err) || 'Error While Fetching NFTs',
      });
    }
  };

  useEffect(() => {
    if (isFetchOnLoad && address && isStakedModal) {
      handleNfts();
    }
  }, [isFetchOnLoad, address]);

  return {
    data,
    isFetching,
    isError,
    handleNfts,
    handleNftsWithTokenIds,
  };
}

export default useNFT;
