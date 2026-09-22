import type { Metadata } from 'next';
import { Noto_Sans_Thai, Noto_Serif_Thai } from 'next/font/google';
import { Website } from '@/components/website';
import { JsonLd } from '@/components/ui';
import { company } from '@/data/company';
import { categories } from '@/data/products';
import { isIndexable, siteUrl } from '@/lib/seo';
import './globals.css';
import './shell.css';
import './polish.css';
const sans = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});
const serif = Noto_Serif_Thai({
  subsets: ['thai', 'latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600'],
});
export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: 'MasterTechhomesolution | MASTER SCIENCE AND TECHNOLOGY — Home Lift, Elevator & Escalator Solutions',
    template: '%s | MasterTechhomesolution',
  },
  description: company.description,
  robots: { index: isIndexable, follow: isIndexable },
  openGraph: {
    siteName: company.siteName,
    locale: 'th_TH',
    type: 'website',
    title: company.siteName,
    description: company.description,
  },
  icons: { icon: '/brand/mast-tech.png' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" data-theme="midnight" suppressHydrationWarning>
      <body className={sans.variable + ' ' + serif.variable}>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: company.name,
            alternateName: [company.siteName, company.shortName, 'Mast Tech'],
            slogan: company.slogan,
            brand: { '@type': 'Brand', name: company.brand },
            knowsAbout: categories.map((c) => c.name + ' (' + c.en + ')'),
            description: company.description,
            telephone: company.COMPANY_PHONE,
            address: company.postalAddress,
            ...(siteUrl ? { url: siteUrl, logo: siteUrl + '/brand/mast-tech.png' } : {}),
          }}
        />
        <Website>{children}</Website>
      </body>
    </html>
  );
}
