import type {Metadata} from 'next';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import { BackToTop } from '@/components/back-to-top';
import { Toaster } from '@/components/ui/toaster';
import { getAgencyDisplayName, getSiteConfig } from '@/lib/public-site';
import { getRequestAgencySlug } from '@/lib/server-agency';

export async function generateMetadata(): Promise<Metadata> {
  const agencySlug = await getRequestAgencySlug();
  const siteConfig = await getSiteConfig(agencySlug);
  const agencyName = getAgencyDisplayName(siteConfig);
  const logoIconUrl = siteConfig.profile?.logo?.trim() || undefined;

  return {
    title: siteConfig.branding?.metaTitle?.trim() || `${agencyName} | Extraordinary Real Estate`,
    description:
      siteConfig.branding?.metaDescription?.trim()
      || `Premium Australian residential and commercial opportunities presented by ${agencyName}.`,
    icons: logoIconUrl
      ? {
          icon: [{ url: logoIconUrl }],
          shortcut: [{ url: logoIconUrl }],
          apple: [{ url: logoIconUrl }],
        }
      : undefined,
  };
}

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
