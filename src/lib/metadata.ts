import { Metadata } from 'next';

interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  noIndex?: boolean;
  path?: string;
}

const baseUrl = 'https://casper.dev';

export function generateMetadata({
  title,
  description,
  keywords,
  ogImage = '/og-image.png',
  noIndex = false,
  path = '',
}: PageMetadata): Metadata {
  const fullTitle = title === 'casper.dev' ? title : `${title} | casper.dev`;
  const url = `${baseUrl}${path}`;
  
  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: 'Casper Truberg' }],
    creator: 'Casper Truberg',
    publisher: 'Casper Truberg',
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      type: 'website',
      url,
      title: fullTitle,
      description,
      siteName: 'casper.dev',
      images: [
        {
          url: `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: description,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  };
}