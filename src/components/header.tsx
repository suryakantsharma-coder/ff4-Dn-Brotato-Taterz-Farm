'use client';
import Image from 'next/image';
import headerImg from '@/assests/header/header.png';
import { useEffect } from 'react';
import useStakeingHook from '@/hooks/useStakeingHook';

function Header() {
  const { hash, setHash, transactionStatus, clearHash } = useStakeingHook();

  useEffect(() => {
    const hash = localStorage.getItem('hash');
    setHash(hash as string);
  }, []);

  return (
    <>
      {hash && transactionStatus == 'pending' && (
        <div
          className="
        w-[100%] h-10 bg-[#2B476E] text-[#FFFFFF] flex justify-between items-center sticky top-0 gap-2 px-4
        "
        >
          <div className=" lg:w-[59%] 2xl:w-[56%] flex justify-end items-center gap-4">
            <div
              className="animate-spin text-[#FFFF8F] inline-block size-4 border-3 border-current border-t-transparent  rounded-full "
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
            <p>Transaction Status : {transactionStatus}</p>
          </div>
          <p className="  text-red-400 cursor-pointer" onClick={() => clearHash()}>
            x
          </p>
        </div>
      )}
      <div className="w-[100%] h-[100px] bg-[white] flex flex-row justify-between items-center">
        <div className="w-[100%] flex justify-center  items-center">
          <Image
            className="transition-transform duration-300 hover:scale-110"
            src={headerImg.src}
            alt="logo"
            width={180}
            height={180}
            onClick={() => window.open('https://www.davydonothing.com/')}
          />

          {/* <div className="flex justify-center items-center gap-3">
          <Image className="rounded-[50%]" src={youtubeImg.src} alt="logo" width={40} height={40} />
          <Image className="rounded-[50%]" src={xImg.src} alt="logo" width={40} height={40} />
          <Image
          className="rounded-[50%]"
          src={telegramImg.src}
          alt="logo"
          width={40}
          height={40}
          />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Header;
