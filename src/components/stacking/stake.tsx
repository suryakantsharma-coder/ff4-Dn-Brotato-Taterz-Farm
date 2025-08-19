'use client';
import { useState } from 'react';
import StackModal from './stackModal';
import StakedDialog from './stakedSuccess';

function Stake({
  refetchStakedCount,
  refetchStakedTokens,
  refetchtokenBalance,
  disabled,
}: {
  refetchStakedCount: () => void;
  refetchStakedTokens: () => void;
  refetchtokenBalance: () => void;
  disabled: boolean;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  return (
    <>
      <div className="w-[100%] flex justify-center items-center my-4">
        <div className="w-[100%]">
          <div
            className="btn_stake"
            style={{
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.7 : 1,
            }}
            onClick={() => {
              if (disabled) return;
              setOpen(true);
            }}
          ></div>
        </div>
      </div>
      {open && (
        <StackModal
          open={open}
          onClose={(isSuccess) => {
            if (isSuccess) {
              setIsSuccess(true);
            }
            refetchStakedCount();
            refetchStakedTokens();
            refetchtokenBalance();
            setOpen(false);
          }}
        />
      )}

      {isSuccess && <StakedDialog setClose={() => setIsSuccess(false)} />}
    </>
  );
}

export default Stake;
