import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Netflux',
  description: 'Stream movies like Netflix',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
