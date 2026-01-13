import './globals.css';
import type { Metadata } from 'next';

export const meta: Metadata = {
  title: 'Netflux',
  description: 'Movie streaming',
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
