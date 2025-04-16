import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discover A2A Protocols | A2A Protocol Directory',
  description: 'Explore and discover A2A (Agent-to-Agent) protocols in our comprehensive directory. Find protocols by name, feature, or tags.',
  keywords: 'A2A protocols, agent-to-agent protocols, AI protocols, protocol directory',
  openGraph: {
    title: 'Discover A2A Protocols | A2A Protocol Directory',
    description: 'Explore our comprehensive directory of A2A (Agent-to-Agent) protocols',
    url: 'https://a2aprotocol.com/protocols',
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
    title: 'Discover A2A Protocols | A2A Protocol Directory',
    description: 'Explore our comprehensive directory of A2A (Agent-to-Agent) protocols',
    images: ['/a2a_protocol.png'],
  },
};

export default function ProtocolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 