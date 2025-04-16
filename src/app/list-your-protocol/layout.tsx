import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'List Your Protocol | A2A Protocol Directory',
  description: 'Submit your Agent-to-Agent (A2A) protocol to our directory. Showcase your protocol to developers, AI researchers, and the broader AI community.',
  keywords: 'submit protocol, list protocol, A2A protocol directory, agent protocol submission',
  openGraph: {
    title: 'List Your Protocol | A2A Protocol Directory',
    description: 'Submit your A2A protocol to our directory and reach developers and AI researchers worldwide',
    url: 'https://a2aprotocal.com/list-your-protocol',
    siteName: 'A2A Protocol Directory',
    images: [
      {
        url: '/a2a_protocol.png',
        width: 1200,
        height: 630,
        alt: 'A2A Protocol Submission',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'List Your Protocol | A2A Protocol Directory',
    description: 'Submit your A2A protocol to our directory and reach developers and AI researchers worldwide',
    images: ['/a2a_protocol.png'],
  },
};

export default function ListProtocolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 