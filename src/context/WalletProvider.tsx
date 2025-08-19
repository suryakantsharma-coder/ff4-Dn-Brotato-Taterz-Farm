// context/EnvProvider.tsx
'use client';

import React, { createContext, useContext } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ConnectMutate } from 'wagmi/query';

type WalletParams = {
  connect: ReturnType<typeof useConnect>['connect'];
  connectionError: boolean;
  connectionSuccess: boolean;
  address: string | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  isDisconnected: boolean;
  isReconnecting: boolean;
  disconnect: ReturnType<typeof useDisconnect>['disconnect'];
  disconnectionError: boolean;
  disconnectionSuccess: boolean;
};

const WalletContext = createContext<WalletParams | null>(null);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const { connect, isError: connectionError, isSuccess: connectionSuccess } = useConnect();
  const { address, isConnected, isConnecting, isDisconnected, isReconnecting } = useAccount();
  const {
    disconnect,
    isError: disconnectionError,
    isSuccess: disconnectionSuccess,
  } = useDisconnect();
  return (
    <WalletContext.Provider
      value={{
        connect,
        connectionError,
        connectionSuccess,
        address,
        isConnected,
        isConnecting,
        isDisconnected,
        isReconnecting,
        disconnect,
        disconnectionError,
        disconnectionSuccess,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletParams => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within an Wallet Provider');
  }
  return context;
};
