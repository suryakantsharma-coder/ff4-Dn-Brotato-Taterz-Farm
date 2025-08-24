import { RAFFLE_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from '@/constant';
import { useEffect, useState } from 'react';
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import ABI from '@/constant/raffle-abi.json';
import { useWallet } from '@/context/WalletProvider';
import { toast } from 'react-toastify';
import { erc20Abi } from 'viem';
import { ethers, formatUnits } from 'ethers';
import { linea, sepolia } from 'viem/chains';

export enum TX_STATUS {
  NONE = 'none',
  LOADING = 'loading',
  COMPLETE = 'complete',
  SUCCESS = 'success',
  FAILED = 'failed',
}

function useRaffle() {
  const { address } = useWallet();
  const [hash, setHash] = useState<string>('');
  const [isSufficent, setIsSufficent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [raffleStatus, setRaffleStatus] = useState<TX_STATUS>(TX_STATUS.NONE);
  const transactionRequest = useWaitForTransactionReceipt({
    hash: hash as `0x${string}`,
  });
  const isClose = false;

  const {
    data: hasEntered,
    isFetching,
    isError,
    refetch: refetchHasEntered,
  } = useReadContract({
    address: RAFFLE_CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'hasEntered',
    args: ['1', address],
  });

  const {
    data: balance,
    isFetching: isBalanceFetching,
    isError: isBalanceError,
    refetch: refetchBalance,
  } = useReadContract({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
  });

  const {
    data: currentPrice,
    isFetching: isCurrentPriceFetching,
    isError: isCurrentPriceError,
    refetch: refetchCurrentPrice,
  } = useReadContract({
    address: RAFFLE_CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'priceByRaffle',
    args: ['1'],
  });

  const {
    data: txHash,
    isPending,
    isError: isContractError,
    error: contractError,
    writeContractAsync,
  } = useWriteContract();

  const waitForTransactions = async (hash: string) => {
    const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
    console.log({ provider });
    const tx = await provider.waitForTransaction(hash as `0x${string}`);
    console.log({ tx });
    return tx;
  };

  const handleTicket = async () => {
    try {
      // const isSufficent = localStorage.getItem('isContributed') || false;

      if (hasEntered) return;
      setIsLoading(true);
      setRaffleStatus(TX_STATUS.LOADING);
      const approval = await writeContractAsync({
        address: TOKEN_CONTRACT_ADDRESS,
        abi: erc20Abi,
        functionName: 'approve',
        args: [RAFFLE_CONTRACT_ADDRESS, currentPrice as bigint],
      });
      setHash(approval as string);
      console.log({ txHash, approval });

      setTimeout(async () => {
        const hash = await writeContractAsync({
          address: RAFFLE_CONTRACT_ADDRESS,
          abi: ABI,
          functionName: 'buyTicket',
          args: [],
        });
        setHash(hash);
        localStorage.setItem('hash', hash as string);
        localStorage.setItem('isContributed', 'true');

        setRaffleStatus(TX_STATUS.COMPLETE);

        setTimeout(() => {
          handleRefresh();
          setRaffleStatus(TX_STATUS.SUCCESS);
          setIsLoading(false);
        }, 20000);
      }, 5000);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      toast.error('Failed to buy ticket', {
        style: {
          fontSize: 16,
        },
      });
    }
  };

  const handleBalanceCheck = (balance: bigint, currentPrice: bigint) => {
    const ownerBalance = formatUnits(balance as bigint, 18);
    const currentTokenPrice = formatUnits(currentPrice as bigint, 18);
    if (parseFloat(ownerBalance) >= parseFloat(currentTokenPrice)) {
      setIsSufficent(true);
    } else {
      setIsSufficent(false);
    }
  };

  useEffect(() => {
    console.log({ balance, currentPrice });
    if ((balance as bigint) >= BigInt(0) && currentPrice) {
      handleBalanceCheck(balance as bigint, currentPrice as bigint);
    }
  }, [balance, currentPrice]);

  const handleRefresh = () => {
    refetchBalance();
    refetchCurrentPrice();
    refetchHasEntered();
  };

  useEffect(() => {
    handleRefresh();
  }, [address]);

  return {
    hasEntered,
    isFetching,
    isError,

    balance,
    isBalanceFetching,
    isBalanceError,
    currentPrice,
    isCurrentPriceFetching,
    isCurrentPriceError,
    txHash,
    isPending,
    isContractError,
    contractError,
    handleTicket,
    hash,
    setHash,
    isSufficent,
    setIsSufficent,
    raffleStatus,
    isClose,

    isLoading,
    clearHash: () => {
      localStorage.removeItem('hash');
      setHash('');
    },
  };
}

export default useRaffle;
