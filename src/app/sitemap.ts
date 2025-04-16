import { MetadataRoute } from 'next';
import { supabase } from '@/utils/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL for the site
  const baseUrl = 'https://www.a2aprotocal.com';
  
  // Get current date for lastModified
  const currentDate = new Date();
  
  // Define static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/protocols`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/list-your-protocol`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate, 
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate, 
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  // Fetch all approved protocols for dynamic routes
  let protocolRoutes: MetadataRoute.Sitemap = [];
  
  try {
    const { data, error } = await supabase
      .from('protocols')
      .select('name, created_at, updated_at')
      .eq('status', 'approved');
    
    if (error) {
      console.error('Error fetching protocols for sitemap:', error);
    } else if (data) {
      // Format protocol data for sitemap
      protocolRoutes = data.map(protocol => {
        // Convert spaces in name to hyphens for URL
        const formattedName = encodeURIComponent(protocol.name.replace(/ /g, '-'));
        // Use updated_at for lastModified if available, otherwise created_at
        const lastModified = protocol.updated_at 
          ? new Date(protocol.updated_at) 
          : new Date(protocol.created_at);
        
        return {
          url: `${baseUrl}/protocols/${formattedName}`,
          lastModified,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        };
      });
    }
  } catch (error) {
    console.error('Error in sitemap generation:', error);
  }

  // Combine static and dynamic routes
  return [...staticRoutes, ...protocolRoutes];
} 