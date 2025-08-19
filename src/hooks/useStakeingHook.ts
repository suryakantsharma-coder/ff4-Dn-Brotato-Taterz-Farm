'use client';
import {
  NFT_CONTRACT_ADDRESS,
  STACKING_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
} from '@/constant';
import { useWallet } from '@/context/WalletProvider';
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import ABI from '@/constant/stacking-abi.json';
import { erc20Abi, erc721Abi } from 'viem';
import { useEffect, useState } from 'react';

function useStakeingHook() {
  const { address } = useWallet();
  const [hash, setHash] = useState<string>('');

  const {
    data: txHash,
    isPending,
    isSuccess,
    isError: isContractError,
    error: contractError,
    writeContractAsync,
  } = useWriteContract();

  const {
    data: stakedTokens,
    isError: stackedError,
    isSuccess: stackedSuccess,
    isLoading: isStackedLoading,
    refetch: refetchStakedTokens,
  } = useReadContract({
    address: STACKING_CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'getStakedTokens',
    args: [address],
  });

  const {
    data: stakedCount,
    isError: stackedCountError,
    isSuccess: stackedCountSuccess,
    isLoading: isStackedCountLoading,
    refetch: refetchStakedCount,
  } = useReadContract({
    address: STACKING_CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'getStakedCount',
    args: [address],
  });

  const {
    data: claimRewards,
    isError: claimRewardsError,
    isSuccess: claimRewardsSuccess,
    isLoading: isClaimRewardsLoading,
    refetch: refetchClaimRewards,
  } = useReadContract({
    address: STACKING_CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'getPendingRewards',
    args: [address],
  });

  const {
    data: tokenBalance,
    isError: tokenBalanceError,
    isSuccess: tokenBalanceSuccess,
    isLoading: isTokenBalanceLoading,
  } = useReadContract({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
  });

  const {
    isSuccess: isTransactionSuccess,
    isRefetching,
    isPending: isTransactionPending,
    status: transactionStatus,
  } = useWaitForTransactionReceipt({
    hash: hash as `0x${string}`,
  });

  // write contracts

  const handleStakeNft = async (ids: Array<string>) => {
    await handleApproveNft();
    const hash = await writeContractAsync({
      address: STACKING_CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'stake',
      args: [ids],
      gas: BigInt(1000000),
    });
    setHash(hash);
    localStorage.setItem('hash', hash);
  };

  const handleUnstakeNft = async (ids: Array<string>) => {
    const hash = await writeContractAsync({
      address: STACKING_CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'unstake',
      args: [ids],
    });
    setHash(hash);
    localStorage.setItem('hash', hash);
  };

  const handleApproveNft = async () => {
    await writeContractAsync({
      address: NFT_CONTRACT_ADDRESS,
      abi: erc721Abi,
      functionName: 'setApprovalForAll',
      args: [STACKING_CONTRACT_ADDRESS, true],
    });
    setHash(hash);
    localStorage.setItem('isApproved', 'true');
    localStorage.setItem('hash', hash);
  };

  const clearHash = () => {
    localStorage.removeItem('hash');
    setHash('');
  };

  useEffect(() => {
    const hash = localStorage.getItem('hash');
    setHash(hash as string);
    if (transactionStatus === 'success') {
      localStorage.removeItem('hash');
      setHash('');
    } else if (transactionStatus === 'error') {
      localStorage.removeItem('hash');
      setHash('');
    }
  }, [transactionStatus]);

  return {
    handleStakeNft,
    handleUnstakeNft,
    clearHash,
    txHash,
    isPending,
    isSuccess,
    isContractError,
    contractError,
    isTransactionPending,
    isTransactionSuccess,
    isRefetching,
    transactionStatus,
    stakedTokens,
    stackedError,
    stackedSuccess,
    isStackedLoading,
    stakedCount,
    stackedCountError,
    stackedCountSuccess,
    isStackedCountLoading,
    claimRewards,
    claimRewardsError,
    claimRewardsSuccess,
    isClaimRewardsLoading,
    tokenBalance,
    tokenBalanceError,
    tokenBalanceSuccess,
    isTokenBalanceLoading,
    hash,
    setHash,
    refetchClaimRewards,
    refetchStakedCount,
    refetchStakedTokens,
  };
}

export default useStakeingHook;
