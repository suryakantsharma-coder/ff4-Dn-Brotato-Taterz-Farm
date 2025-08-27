'use client';
import Disconnect from '@/components/disconnect';
import Header from '@/components/header';
import TicketButton from '@/components/raffle/ticket';
import WalletConnect from '@/components/walletConnect';
import { useWallet } from '@/context/WalletProvider';
import useRaffle, { TX_STATUS } from '@/hooks/useRaffle';
import { ToastContainer } from 'react-toastify';

import { formatUnits } from 'viem';
import RaffleDialog from '@/components/stacking/raffleSuccess';

function RafflePage() {
  const { address } = useWallet();
  const {
    hasEntered,
    balance,
    currentPrice,
    handleTicket,
    isSufficent,
    isLoading,
    raffleStatus,
    setRaffleStatus,
    isClose,
  } = useRaffle();
  return (
    <>
      <ToastContainer />
      <Header />

      {parseInt(formatUnits((currentPrice as bigint) || BigInt('0'), 18)) < 5000000 ? (
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
          <h1 className="text-center text-6xl my-20">
            Ticket purchases are closed/paused right now
          </h1>
        </>
      )}

      {raffleStatus === TX_STATUS.SUCCESS && (
        <RaffleDialog
          setClose={() => {
            setRaffleStatus(TX_STATUS.NONE);
          }}
        />
      )}
    </>
  );
}

export default RafflePage;
