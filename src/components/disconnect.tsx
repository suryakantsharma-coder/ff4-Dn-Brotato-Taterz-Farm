'use client';
import { useWallet } from '@/context/WalletProvider';
function Disconnect({ disabled }: { disabled: boolean }) {
  const { disconnect, address, disconnectionError, disconnectionSuccess } = useWallet();
  return (
    <div className="w-[100%]">
      {disconnectionError && <p>Disconnection Error</p>}
      {address && (
        <div
          className="btn_disconnect"
          style={{
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.7 : 1,
          }}
          onClick={() => {
            if (disabled) return;
            disconnect();
          }}
        ></div>
      )}
    </div>
  );
}

export default Disconnect;
