import type {Metadata} from 'next';
import './globals.css';
import { BackToTop } from '@/components/back-to-top';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Vela Armon | Extraordinary Real Estate',
  description: 'Premium Australian residential and commercial opportunities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Public+Sans:wght@800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <BackToTop />
        <Toaster />
      </body>
    </html>
  );
}
