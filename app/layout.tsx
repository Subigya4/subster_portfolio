import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Poppins } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ClientEffects from '@/components/ClientEffects';
import { site } from '@/lib/data';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: site.title,
    description: site.description,
    type: 'website',
    url: '/',
    siteName: site.name,
    images: [{ url: '/assets/og.png', width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: ['/assets/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#151312',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below adds `js` to <html>'s class
    // before React hydrates. This flag only covers <html>'s own attributes.
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body>
        {/* Flags that scripts run so the scroll-reveal hidden state can apply.
            Runs before paint; if JS is unavailable the page renders fully visible.
            If the app bundle never boots (blocked/failed), ClientEffects never adds
            `is-ready`, so the flag is dropped after 4s and content shows anyway. */}
        <Script id="js-flag" strategy="beforeInteractive">
          {`(function(d){d.classList.add('js');setTimeout(function(){if(!d.classList.contains('is-ready'))d.classList.remove('js')},4000)})(document.documentElement)`}
        </Script>
        <Nav />
        {children}
        <Footer />
        <ClientEffects />
      </body>
    </html>
  );
}
