import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | A2A Protocol Directory',
  description: 'Learn about how A2A Protocol Directory collects, uses, and protects your personal information. Our privacy policy outlines our commitment to your data security and privacy rights.',
  keywords: 'privacy policy, data protection, personal data, cookies, user rights, data security, A2A Protocol',
  openGraph: {
    title: 'Privacy Policy | A2A Protocol Directory',
    description: 'Learn about how A2A Protocol Directory collects, uses, and protects your personal information.',
    url: 'https://www.a2aprotocal.com/privacy',
    siteName: 'A2A Protocol Directory',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | A2A Protocol Directory',
    description: 'Learn about how A2A Protocol Directory collects, uses, and protects your personal information.',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 