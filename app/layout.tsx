// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metaMetadata = {
  title: 'Netflux',
  description: 'Stream movies and series',
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
