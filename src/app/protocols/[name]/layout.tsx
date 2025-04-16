import type { Metadata } from 'next';
import { supabase } from '../../../utils/supabase';

type Props = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Convert URL-friendly name to database name
  const { name } = await params;
  const decodedName = decodeURIComponent(name).replace(/-/g, ' ');
  
  try {
    // Fetch the protocol data
    const { data, error } = await supabase
      .from('protocols')
      .select('*')
      .ilike('name', decodedName)
      .eq('status', 'approved')
      .single();
    
    if (error || !data) {
      return {
        title: 'Protocol Not Found | A2A Protocol Directory',
        description: 'The requested protocol could not be found or is pending approval.',
      };
    }
    
    // Extract relevant metadata from the protocol
    const name = data.name;
    const description = data.description;
    const tags = data.tags ? data.tags.split(',').join(', ') : '';
    const logoUrl = data.logo_url || '/a2a_protocol.png';
    
    return {
      title: `${name} | A2A Protocol Directory`,
      description: description.substring(0, 160), // Truncate to a reasonable length for meta description
      keywords: `${name}, ${tags}, A2A protocol, agent-to-agent protocol`,
      openGraph: {
        title: `${name} | A2A Protocol Directory`,
        description: description.substring(0, 200),
        url: `https://a2aprotocol.com/protocols/${name}`,
        siteName: 'A2A Protocol Directory',
        images: [
          {
            url: logoUrl,
            width: 1200,
            height: 630,
            alt: `${name} Protocol`,
          }
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${name} | A2A Protocol Directory`,
        description: description.substring(0, 200),
        images: [logoUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    // Fallback metadata if there's an error
    return {
      title: 'Protocol Details | A2A Protocol Directory',
      description: 'Explore detailed information about this A2A protocol including features, documentation, and implementation details.',
    };
  }
}

export default function ProtocolDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 