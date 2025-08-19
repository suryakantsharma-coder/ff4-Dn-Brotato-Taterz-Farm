import Image from 'next/image';
function StakedDialog({ setClose }: { setClose: () => void }) {
  return (
    // <div className="w-full h-full bg-[rgba(0,0,0,0.8)] absolute top-0 left-0 flex justify-center items-center text-white overflow-hidden">
    //   <div
    //     className="relative w-[70%] lg:w-[30%] 2xl:w-[12%] max-h-[60%]  lg:max-h-[40%] rounded-[20px] px-2 flex flex-col justify-center items-center"
    //     onClick={(e) => e.stopPropagation()}
    //   >
    //     {/* Image container with 3D hover effect */}
    //     <div className="w-full relative h-[450px] lg:h-[600px] xl:h-[400px] perspective-[1000px] group -top-20">
    //       <div className="w-full h-full relative transition-transform duration-500 ease-in-out transform-gpu group-hover:rotate-x-10 group-hover:rotate-y-10">
    //         <Image
    //           src={StackedImage}
    //           alt="stacked"
    //           fill
    //           style={{ objectFit: 'contain', borderRadius: '20px' }}
    //           className="rounded-[20px]"
    //         />
    //       </div>

    //       <button
    //         className="absolute -bottom-20 left-1/2 -translate-x-1/2 bg-[#42defb] px-10 py-2 w-[150px] h-[40px] rounded-[10px] flex justify-center items-center cursor-pointer hover:bg-[#00ffe8]"
    //         onClick={() => setClose()}
    //       >
    //         Got It
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className="w-full h-full bg-[rgba(0,0,0,0.8)] absolute top-0 left-0 flex justify-center items-center text-white overflow-hidden">
      <div
        className="relative w-[85%] md:w-[50%] lg:w-[25%] 2xl:w-[18%] max-h-[85%] rounded-[20px] px-2 flex flex-col justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image container with aspect ratio */}
        <div className="w-full rounded-[20px] overflow-hidden hover:-rotate-x-10 hover:-rotate-y-10 transition-transform duration-500 ease-in-out flex justify-center items-center">
          <Image
            src={'/dialogbox/FarmingFinal.png'}
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

    // <div className="w-full h-full bg-[rgba(0,0,0,0.8)] absolute top-0 left-0 flex justify-center items-center text-white overflow-hidden">
    //   <div
    //     className="relative w-[70%] lg:w-[30%]  2xl:w-[12%] max-h-[60%] lg:max-h-[100%] lg:max-h-[40%] rounded-[20px] px-2 "
    //     onClick={(e) => e.stopPropagation()}
    //   >
    //     {/* Image container needs a fixed height */}
    //     <div className="w-full relative h-[450px] lg:h-[380px] xl:h-[400px]">
    //       <Image
    //         src={StackedImage}
    //         alt="stacked"
    //         fill
    //         style={{ objectFit: 'contain', borderRadius: '20px' }}
    //       />

    //       <button className="absolute -bottom-20 left-1/2 -translate-x-1/2 bg-[#72ddef] px-10 py-2 w-[150px] h-[40px] rounded-[10px] flex justify-center items-center cursor-pointer">
    //         Got It
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default StakedDialog;
