import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | A2A Protocol Directory',
  description: 'Learn about our mission to create the standard for agent-to-agent communication protocols in the AI ecosystem. Discover how we curate and maintain the definitive A2A protocol directory.',
  keywords: 'about A2A protocols, AI agent protocols, agent-to-agent communication, A2A mission, AI interoperability',
  openGraph: {
    title: 'About A2A Protocol Directory',
    description: 'Our mission is to standardize agent-to-agent communication in the AI ecosystem',
    url: 'https://a2aprotocal.com/about',
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
    title: 'About A2A Protocol Directory',
    description: 'Our mission is to standardize agent-to-agent communication in the AI ecosystem',
    images: ['/a2a_protocol.png'],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 