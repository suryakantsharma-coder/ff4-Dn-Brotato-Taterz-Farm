import RafflePage from '@/components/raffle';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';

export const metadata = {
  title: 'TATERZ Raffles',
  description: 'TATERZ Raffles',
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

function Page() {
  return (
    <div className={geistSans.variable + ' ' + 'bg_raffle_img'}>
      <RafflePage />
    </div>
  );
}

export default Page;
