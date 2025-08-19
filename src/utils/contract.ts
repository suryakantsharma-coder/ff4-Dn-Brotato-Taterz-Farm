import { STACKING_CONTRACT_ADDRESS } from '@/constant';
import { ethers, Signer } from 'ethers';
import STACKING_CONTRACT_ABI from '@/constant/stacking-abi.json';
export const stakeNfts = async (ids: Array<string>, signer: Signer) => {
  if (signer) {
    const contract = new ethers.Contract(STACKING_CONTRACT_ADDRESS, STACKING_CONTRACT_ABI, signer);
    await contract.stake(ids);
    return true;
  }
};

export const approveNft = async (signer: Signer) => {
  if (signer) {
    const contract = new ethers.Contract(STACKING_CONTRACT_ADDRESS, STACKING_CONTRACT_ABI, signer);
    await contract.setApprovalForAll(STACKING_CONTRACT_ADDRESS, true);
    return true;
  }
};

export const unstakeNfts = async (ids: Array<string>, signer: Signer) => {
  if (signer) {
    const contract = new ethers.Contract(STACKING_CONTRACT_ADDRESS, STACKING_CONTRACT_ABI, signer);
    await contract.Unstaked(ids);
    return true;
  }
};

export const claimRewards = async (signer: Signer) => {
  if (signer) {
    const contract = new ethers.Contract(STACKING_CONTRACT_ADDRESS, STACKING_CONTRACT_ABI, signer);
    await contract.claimRewards();
    return true;
  }
};
