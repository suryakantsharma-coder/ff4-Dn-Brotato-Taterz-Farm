import Image from 'next/image';
function RaffleDialog({ setClose }: { setClose: () => void }) {
  return (
    <div className="w-full h-full bg-[rgba(0,0,0,0.8)] absolute top-0 left-0 flex justify-center items-center text-white overflow-hidden">
      <div
        className="relative w-[85%] md:w-[50%] lg:w-[25%] 2xl:w-[18%] max-h-[85%] rounded-[20px] px-2 flex flex-col justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image container with aspect ratio */}
        <div className="w-full rounded-[20px] overflow-hidden hover:-rotate-x-10 hover:-rotate-y-10 transition-transform duration-500 ease-in-out flex justify-center items-center">
          <Image
            src={'/dialogbox/raffleSuccess.png'}
            alt="stacked"
            width={500} // native width of your image
            height={650} // native height of your image
            style={{ objectFit: 'contain', borderRadius: '20px' }}
            className="rounded-[20px] w-full h-auto"
          />
        </div>

        {/* Button below image */}
        <button
          className="mt-6 bg-[#42defb] px-10 py-2 w-[150px] h-[40px] rounded-[10px] flex justify-center items-center cursor-pointer hover:bg-[#00ffe8]"
          onClick={() => setClose()}
        >
          Got It
        </button>
      </div>
    </div>
  );
}

export default RaffleDialog;
