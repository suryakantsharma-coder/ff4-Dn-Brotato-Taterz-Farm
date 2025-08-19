import { STACKING_CONTRACT_ADDRESS } from '@/constant';
import useStakeingHook from '@/hooks/useStakeingHook';
import { formatEther } from 'ethers';
import { useEffect, useState } from 'react';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import ABI from '@/constant/stacking-abi.json';
import HarvestedDialog from './harvestSuccess';
import { toast } from 'react-toastify';

function Claim({
  refetchClaimRewards,
  refetchStakedTokens,
  refetchtokenBalance,
  setClaimTransactionPending,
  disabled,
}: {
  refetchClaimRewards: () => void;
  refetchStakedTokens: () => void;
  refetchtokenBalance: () => void;
  setClaimTransactionPending: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
}) {
  const { claimRewards } = useStakeingHook();
  const [hash, setHash] = useState<string>('');
  const [claimBtnVisible, setClaimBtnVisible] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const {
    data: txHash,
    isPending,
    isError: isContractError,
    error: contractError,
    writeContractAsync,
  } = useWriteContract();

  const {
    isSuccess: isTransactionSuccess,
    isRefetching,
    isPending: isTransactionPending,
    status: transactionStatus,
  } = useWaitForTransactionReceipt({
    hash: hash as `0x${string}`,
  });

  const handleClaimRewards = async () => {
    setClaimBtnVisible(false);
    const hash = await writeContractAsync({
      address: STACKING_CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'claimRewards',
    });
    setHash(hash);
    setClaimTransactionPending(true);
    localStorage.setItem('hash', hash);
  };

  useEffect(() => {
    if (isTransactionSuccess) {
      setIsSuccess(true);
      refetchClaimRewards();
      refetchStakedTokens();
      refetchtokenBalance();
      setClaimTransactionPending(false);
      setTimeout(() => setClaimBtnVisible(false), 2000);
      return;
    }

    if (isContractError || transactionStatus === 'error') {
      setIsSuccess(false);
      setClaimBtnVisible(true);
      setClaimTransactionPending(false);
      return;
    }

    // Set button visible only if not pending and not success
  }, [isTransactionSuccess, isContractError, transactionStatus, isPending, claimRewards]);

  useEffect(() => {
    if (transactionStatus == 'success') {
      toast.success('Congrats! You Claimed Successfully', {
        style: {
          fontSize: 16,
        },
      });
      localStorage.removeItem('hash');
      setClaimTransactionPending(false);
      setHash('');
    } else if (transactionStatus == 'error') {
      toast.error(contractError?.message || 'Error While Claiming', {
        style: {
          fontSize: 16,
        },
      });
      localStorage.removeItem('hash');
      setClaimTransactionPending(false);
      setHash('');
    }
  }, [transactionStatus]);

  useEffect(() => {
    const isClaimable = parseFloat(formatEther(`${claimRewards || 0}` || '0'));
    if (isClaimable > 0 && !isTransactionSuccess) {
      setClaimBtnVisible(true);
    }
  }, [claimRewards]);

  return (
    <div className="w-[100%] my-4">
      <></>
      {isPending && <h1 className="text-4xl">HARVESTING TATERZ...</h1>}
      {!isPending && transactionStatus == 'pending' && hash && (
        <h1 className="text-4xl">HARVESTING TATERZ...</h1>
      )}
      {!claimBtnVisible && transactionStatus == 'success' && (
        <h1 className="text-4xl">HARVESTED</h1>
      )}
      {claimBtnVisible && (
        <div
          className="btn_claim"
          style={{
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.7 : 1,
          }}
          onClick={(e) => {
            if (!disabled) {
              e.stopPropagation();
              handleClaimRewards();
              setClaimBtnVisible(false);
            }
          }}
        ></div>
      )}

      {isSuccess && <HarvestedDialog setClose={() => setIsSuccess(false)} />}
    </div>
  );
}

export default Claim;
