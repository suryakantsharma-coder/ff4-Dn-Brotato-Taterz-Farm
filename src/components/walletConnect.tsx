'use client';
import { useWallet } from '@/context/WalletProvider';
import { useAppKit } from '@reown/appkit/react';
import { useEffect } from 'react';
import { useSwitchChain } from 'wagmi';

function WalletConnect() {
  const { isConnecting, address } = useWallet();
  const { open } = useAppKit();

  useEffect(() => {}, [isConnecting]);

  return (
    <div className="w-[100%]">
      {isConnecting && <p>Connecting...</p>}
      {!address && (
        <div
          className="btn_connect"
          onClick={() => {
            open();
          }}
        ></div>
      )}
    </div>
  );
}

export default WalletConnect;
