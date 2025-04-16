import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | A2A Protocol Directory',
  description: 'Terms and conditions for using the A2A Protocol Directory. Review our policies regarding usage, liability, termination, and more.',
  keywords: 'terms and conditions, A2A Protocol terms, legal agreement, service terms, user agreement',
  openGraph: {
    title: 'Terms and Conditions | A2A Protocol Directory',
    description: 'Legal terms and conditions for using the A2A Protocol Directory',
    url: 'https://a2aprotocal.com/terms',
    siteName: 'A2A Protocol Directory',
    images: [
      {
        url: '/a2a_protocol.png',
        width: 1200,
        height: 630,
        alt: 'A2A Protocol Directory',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms and Conditions | A2A Protocol Directory',
    description: 'Legal terms and conditions for using the A2A Protocol Directory',
    images: ['/a2a_protocol.png'],
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 