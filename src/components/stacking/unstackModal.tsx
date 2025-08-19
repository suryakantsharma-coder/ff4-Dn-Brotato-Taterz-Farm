import { NFT_CONTRACT_ADDRESS } from '@/constant';
import { useWallet } from '@/context/WalletProvider';
import { NftItem } from '@/data/alchemy';
import useNFT from '@/hooks/useNFT';
import useStakeingHook from '@/hooks/useStakeingHook';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function UnStackModal({ open, onClose }: { open: boolean; onClose: (isSuccess: boolean) => void }) {
  const { address } = useWallet();
  const [txnState, setTxnState] = useState(false);
  const { data, isError, isFetching, handleNftsWithTokenIds } = useNFT({
    contractAddress: NFT_CONTRACT_ADDRESS,
    address: address || '',
    isFetchOnLoad: true,
    isStakedModal: false,
  });

  const {
    handleUnstakeNft,
    isPending,
    txHash,
    isTransactionPending,
    transactionStatus,
    isTransactionSuccess,
    contractError,
    isContractError,
    stakedTokens,
  } = useStakeingHook();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const hash = localStorage.getItem('hash');
    if (hash) {
      setTxnState(true);
    }
  }, []);

  useEffect(() => {
    if (isTransactionSuccess) {
      setTimeout(() => {
        setTxnState(false);
        onClose(true);
      }, 3000);
    }

    if (isPending) {
      setTxnState(true);
    }

    if (isError?.isError || isContractError) {
      console.log(contractError);
      setTxnState(false);
    }
  }, [isTransactionSuccess, isPending, isTransactionPending, isError, contractError]);

  useEffect(() => {
    if (stakedTokens) {
      console.log(stakedTokens);
      handleNftsWithTokenIds(stakedTokens as Array<string>);
    }
  }, [stakedTokens]);

  const toggleSelect = (tokenId: string) => {
    setSelectedIds(
      (prev) =>
        prev.includes(tokenId)
          ? prev.filter((id) => id !== tokenId) // uncheck
          : [...prev, tokenId], // check
    );
  };

  const shortenHash = (hash: string): string => `${hash.slice(0, 6)}...${hash.slice(-4)}`;

  console.log({ data });

  return (
    <div
      className="w-[100%] h-[100%] bg-[rgba(0,0,0,0.8)] absolute top-0 left-0 flex justify-center items-center text-white overflow-hidden"
      // onClick={() => onClose()}
    >
      {!txnState && (
        <div
          className="w-[80%] lg:w-[25%] 2xl:w-[26%] max-h-[60%] lg:max-h-[60%] 2xl:max-h-[40%]  bg-[#2B476E] rounded-[20px] px-2 overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-[100%] h-[100%] flex justify-between items-center px-3 sticky top-0 bg-[#2B476E] ">
            <p className="text-5xl">Stop Farming</p>
            <p className="text-5xl cursor-pointer text-red-500" onClick={() => onClose(false)}>
              x
            </p>
          </div>

          {isFetching && (
            <div className="w-[100%] h-[100%] flex justify-center items-center">
              <p className="text-4xl">Loading...</p>
            </div>
          )}

          {data?.length === 0 ||
            (!data && !isFetching && (
              <div className="w-[100%] h-[100%] flex justify-center items-center">
                <p className="text-4xl">No NFT Found</p>
              </div>
            ))}

          {!txnState &&
            data &&
            !isFetching &&
            data.map((item: NftItem) => {
              const tokenId = item.tokenId;
              const isSelected = selectedIds.includes(tokenId);

              return (
                <div
                  className="w-[100%] flex justify-between items-center my-4 gap-4 px-2 cursor-pointer"
                  key={tokenId}
                  onClick={() => toggleSelect(tokenId)}
                >
                  <div className="w-[90%] flex justify-start items-center gap-4">
                    <Image
                      src={
                        item?.image?.cachedUrl ||
                        item?.image?.thumbnailUrl ||
                        item?.image?.originalUrl ||
                        '/assets/header/header.png'
                      }
                      className="rounded-[10px]"
                      alt="logo"
                      width={window?.innerWidth < 400 ? 50 : 60}
                      height={window?.innerWidth < 400 ? 50 : 60}
                    />
                    <h1 className="text-4xl lg:text-4xl 2xl:text-5xl">#{item.tokenId}</h1>
                  </div>

                  <div className="w-[10%]">
                    <input
                      type="checkbox"
                      className="w-[18px] h-[18px]"
                      checked={isSelected}
                      readOnly
                    />
                  </div>
                </div>
              );
            })}

          <div className="w-[100%] flex justify-center items-center mt-4">
            {!isFetching && !isError?.isError && !isFetching && (data as NftItem[])?.length > 0 && (
              <div
                className="btn_unstake"
                style={{ width: 160 }}
                onClick={() => {
                  if (selectedIds.length > 0) {
                    handleUnstakeNft(selectedIds);
                  } else {
                    alert('Please select at least one NFT');
                  }
                }}
              ></div>
            )}
          </div>
        </div>
      )}

      {txnState && (
        <div
          className="w-[70%] lg:w-[25%] 2xl:w-[26%] max-h-[60%] lg:max-h-[60%] 2xl:max-h-[40%] bg-[#2B476E] rounded-[20px] p-2 overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-[100%] h-[100%] flex flex-cols justify-center items-center text-center ">
            {txHash && !isTransactionSuccess && (
              <div className="fle flex-cols justify-center items-center">
                <h1
                  className="text-3xl lg:text-5xl"
                  onClick={() => window.open(`https://lineascan.build/tx/${txHash}`)}
                >
                  Transaction Hash:
                  <span className="text-[#00ffe8] mx-2">{shortenHash(txHash)}</span>
                </h1>
                <br />
                <h1 className="text-3xl lg:text-5xl">
                  Txn status:
                  <h1>
                    <span
                      className="px-1"
                      style={{
                        color: '#00ffe8',
                      }}
                    >
                      {transactionStatus}
                    </span>
                  </h1>
                </h1>
              </div>
            )}
            <br />
            {isPending && <h1 className="text-5xl">Stop Farming...</h1>}
            <br />
            {isTransactionSuccess && <h1 className="text-5xl">Unstaked Successfully</h1>}
          </div>
        </div>
      )}
    </div>
  );
}

export default UnStackModal;
