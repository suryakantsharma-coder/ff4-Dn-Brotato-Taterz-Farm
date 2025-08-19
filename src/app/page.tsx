import Header from '@/components/header';
import StakeWrapper from '@/components/stacking';
import WalletConnect from '@/components/walletConnect';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
    <div className="bg_img">
      <ToastContainer />
      <Header />
      <h1 className="text-7xl text-center my-[5%] px-4">DN BROTATO TATERZ FARM</h1>
      <div className="w-[100%] flex flex-row justify-center items-center">
        <div className="w-50  lg:w-60">
          <WalletConnect />
        </div>
      </div>
      <div className="w-[100%] flex flex-row justify-center items-centerxs">
        <StakeWrapper />
      </div>
      {/* <div className="w-[100%] flex flex-row justify-center items-center">
        <div className="w-50 lg:w-60">
          <Disconnect />
        </div>
      </div> */}
    </div>
  );
}
