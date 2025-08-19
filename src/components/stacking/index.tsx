'use client';

import { useWallet } from '@/context/WalletProvider';
import Claim from './claim';
import Stake from './stake';
import UnStake from './unstake';
import useStakeingHook from '@/hooks/useStakeingHook';
import { formatEther } from 'ethers';
import { useEffect, useState } from 'react';
import { useAppKitNetwork } from '@reown/appkit/react';
import { linea } from 'viem/chains';
import Disconnect from '../disconnect';

function StakeWrapper() {
  const { address } = useWallet();
  const { chainId, switchNetwork } = useAppKitNetwork();
  const [isClaimTransactionPending, setIsClaimTransactionPending] = useState(false);
  const {
    hash,
    stakedCount,
    refetchClaimRewards,
    claimRewards,
    refetchStakedCount,
    tokenBalance,
    refetchStakedTokens,
    transactionStatus,
  } = useStakeingHook();

  useEffect(() => {
    if (chainId !== linea?.id) {
      switchNetwork?.(linea);
    }
  }, [address]);

  return (
    <div className="w-[100%] flex flex-col justify-center items-center text-center">
      {address && (
        <div className="w-[100%]">
          <h1 className="text-5xl py-1">BROTATOES FARMING : {`${stakedCount}` || 0}</h1>
          <h1 className="text-5xl py-1">
            Reward Tokens : {`${parseFloat(formatEther(`${claimRewards || '0'}`)).toFixed(2)}` || 0}
          </h1>
          <h1 className="text-5xl py-1">
            Taterz Balance : {parseFloat(formatEther(`${tokenBalance || '0'}`)).toFixed(2) || 0}
          </h1>
        </div>
      )}
      <div className="w-50 lg:w-60">
        {address && (
          <Claim
            refetchClaimRewards={refetchClaimRewards}
            refetchStakedTokens={refetchStakedTokens}
            refetchtokenBalance={refetchStakedTokens}
            setClaimTransactionPending={setIsClaimTransactionPending}
            disabled={
              isClaimTransactionPending || (transactionStatus == 'pending' && hash) ? true : false
            }
          />
        )}
        {address && (
          <Stake
            refetchStakedCount={refetchStakedCount}
            refetchStakedTokens={refetchStakedTokens}
            refetchtokenBalance={refetchStakedTokens}
            disabled={
              isClaimTransactionPending || (transactionStatus == 'pending' && hash) ? true : false
            }
          />
        )}
        {address && (
          <UnStake
            refetchStakedCount={refetchStakedCount}
            refetchStakedTokens={refetchStakedTokens}
            refetchtokenBalance={refetchStakedTokens}
            disabled={
              isClaimTransactionPending || (transactionStatus == 'pending' && hash) ? true : false
            }
          />
        )}
        {address && (
          <Disconnect
            disabled={
              isClaimTransactionPending || (transactionStatus == 'pending' && hash) ? true : false
            }
          />
        )}
      </div>
    </div>
  );
}

export default StakeWrapper;
