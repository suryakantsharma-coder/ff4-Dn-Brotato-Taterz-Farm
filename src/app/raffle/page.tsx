'use client';
import Disconnect from '@/components/disconnect';
import Header from '@/components/header';
import TicketButton from '@/components/raffle/ticket';
import WalletConnect from '@/components/walletConnect';
import { useWallet } from '@/context/WalletProvider';
import useRaffle, { TX_STATUS } from '@/hooks/useRaffle';
import { ToastContainer } from 'react-toastify';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { formatUnits } from 'viem';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

function Page() {
  const { address } = useWallet();
  const {
    hasEntered,
    balance,
    currentPrice,
    handleTicket,
    isSufficent,
    isLoading,
    raffleStatus,
    isClose,
  } = useRaffle();

  console.log({ hasEntered, balance, currentPrice, isSufficent });
  return (
    <div className={geistSans.variable + ' ' + 'bg_raffle_img'}>
      <ToastContainer />
      <Header />

      {!isClose ? (
        <>
          <div className="w-[100%] flex flex-row justify-center items-center mt-20">
            <div className="w-50  lg:w-60">
              <WalletConnect />
            </div>
          </div>

          {(!hasEntered as boolean) && address && (
            <div className="">
              {(currentPrice as bigint) >= BigInt(0) && (
                <h1 className="text-[40px] text-center px-4">
                  Ticket Price: {formatUnits(currentPrice as bigint, 18)} TATERZ
                </h1>
              )}
              {(balance as bigint) >= BigInt(0) && (
                <h1 className="text-[40px] text-center px-4">
                  Your Balance: {formatUnits(balance as bigint, 18)} TATERZ
                </h1>
              )}
            </div>
          )}

          {address && (
            <div className="w-[100%] flex flex-row justify-center items-centerxs">
              {isSufficent && !hasEntered ? (
                !isLoading ? (
                  <div className="w-[100%] flex justify-center items-center my-4">
                    <div className="w-50  lg:w-60">
                      <TicketButton buyTicket={handleTicket} />
                    </div>
                  </div>
                ) : (
                  <h1 className="text-[40px] text-center px-4">
                    {raffleStatus === TX_STATUS.COMPLETE ? 'purchased' : 'purchasing...'}
                  </h1>
                )
              ) : hasEntered ? (
                <h1 className="text-[40px] text-center px-4">
                  Sorry, you have already entered with this wallet
                </h1>
              ) : (
                <h1 className="text-[40px] text-center px-4">
                  Sorry you do not have enough TATERZ
                </h1>
              )}
            </div>
          )}
          <div className="w-[100%] flex flex-row justify-center items-center">
            <div className="w-50  lg:w-60">
              <Disconnect disabled={isLoading ? true : false} />
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-center text-6xl my-20">Raffle Temporarily Closed</h1>
        </>
      )}
    </div>
  );
}

export default Page;
