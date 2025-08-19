import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ContextProvider from '@/context/contextProvider';
import { WalletProvider } from '@/context/WalletProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dn Brotato Taterz Farm',
  description: 'Dn Brotato Taterz Farm',
  icons: {
    icon: '/fabicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ContextProvider cookies={null}>
          <WalletProvider>{children}</WalletProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
