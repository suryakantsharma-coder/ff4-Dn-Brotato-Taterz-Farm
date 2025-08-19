import { useState } from 'react';
import UnStackModal from './unstackModal';
import UnstakedDialog from './unstakedSuccess';

function UnStake({
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
    <div className="w-[100%] my-4">
      <div
        className="btn_unstake"
        style={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.7 : 1,
        }}
        onClick={() => {
          if (disabled) return;
          setOpen(true);
        }}
      ></div>

      {open && (
        <UnStackModal
          onClose={(isSuccess) => {
            if (isSuccess) setIsSuccess(true);
            refetchStakedTokens();
            refetchStakedCount();
            refetchtokenBalance();
            setOpen(false);
          }}
          open={open}
        />
      )}

      {isSuccess && <UnstakedDialog setClose={() => setIsSuccess(false)} />}
    </div>
  );
}

export default UnStake;
