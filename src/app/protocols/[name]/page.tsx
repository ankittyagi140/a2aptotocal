'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../../../utils/supabase';
import { Protocol } from '../../../types/protocol';
import ProtocolDetailSkeleton from '@/components/ProtocolDetailSkeleton';
import toast from 'react-hot-toast';

export default function ProtocolDetail() {
  const params = useParams();
  const name = params.name as string;
  
  const [protocol, setProtocol] = useState<Protocol | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendedProtocols, setRecommendedProtocols] = useState<Protocol[]>([]);

  useEffect(() => {
    async function fetchProtocol() {
      try {
        setLoading(true);
        
        // Convert URL-friendly name to database name
        const decodedName = decodeURIComponent(name).replace(/-/g, ' ');
        
        const { data, error } = await supabase
          .from('protocols')
          .select('*')
          .ilike('name', decodedName)
          .eq('status', 'approved')
          .single();

        if (error) {
          throw new Error(error.message);
        }

        if (!data) {
          throw new Error('Protocol not found or pending approval');
        }

        // Map snake_case database columns to camelCase properties
        const mappedData: Protocol = {
          id: data.id,
          name: data.name,
          description: data.description,
          features: data.features,
          tags: data.tags,
          githubUrl: data.github_url,
          createdBy: data.created_by,
          contactEmail: data.contact_email,
          websiteLink: data.website_link,
          logoUrl: data.logo_url,
          createdAt: data.created_at,
          status: data.status
        };

        setProtocol(mappedData);
        
        // Fetch recommended protocols (different from current one and approved)
        const { data: recommendedData, error: recommendedError } = await supabase
          .from('protocols')
          .select('*')
          .neq('id', data.id)
          .eq('status', 'approved')
          .limit(3);
          
        if (!recommendedError && recommendedData) {
          const mappedRecommended = recommendedData.map(item => ({
            id: item.id,
            name: item.name,
            description: item.description,
            features: item.features,
            tags: item.tags,
            githubUrl: item.github_url,
            createdBy: item.created_by,
            contactEmail: item.contact_email,
            websiteLink: item.website_link,
            logoUrl: item.logo_url,
            createdAt: item.created_at,
            status: item.status
          }));
          setRecommendedProtocols(mappedRecommended);
        }
      } catch (err) {
        console.error('Error fetching protocol:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch protocol');
        
        toast.error(err instanceof Error ? err.message : 'Failed to fetch protocol', {
          style: {
            borderRadius: '10px',
            background: '#B91C1C',
            color: '#fff',
          },
          icon: '❌',
          duration: 6000
        });
      } finally {
        setLoading(false);
      }
    }

    if (name) {
      fetchProtocol();
    }
  }, [name]);

  // Get protocol icon with logo support
  const getProtocolIcon = (protocolName: string, logoUrl?: string) => {
    if (logoUrl) {
      return (
        <Image 
          src={logoUrl} 
          alt={`${protocolName} logo`} 
          width={48} 
          height={48}
          className="rounded-md object-cover"
        />
      );
    }
    
    // Use default A2A protocol logo
    return (
      <Image 
        src="/a2a_protocol.png" 
        alt="A2A Protocol logo" 
        width={48} 
        height={48}
        className="rounded-md object-cover"
      />
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow bg-white-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-8">
            <Link href="/protocols" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to protocols
            </Link>
            
            <ProtocolDetailSkeleton />
          </div>
        </main>
      </div>
    );
  }

  if (error || !protocol) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow bg-white-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-8">
            <Link href="/protocols" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to protocols
            </Link>
            
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error || 'Protocol not found'}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Parse features as bullet points if they contain newlines
  const featuresList = protocol.features.split('\n').filter(f => f.trim().length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-white-50 dark:bg-gray-900">  
        <div className="container mx-auto px-4 py-8">
          <Link href="/protocols" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to protocols
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Content - Left Side (2/3 width) */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-4 mb-6">
                  {getProtocolIcon(protocol.name, protocol.logoUrl)}
                  <h1 className="text-2xl font-bold">{protocol.name}</h1>
                </div>
                
                {protocol.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {protocol.tags.split(',').map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 text-xs rounded"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {protocol.description}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Features</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                    {featuresList.map((feature, index) => (
                      <li key={index}>{feature.trim()}</li>
                    ))}
                  </ul>
                </div>
                
                {protocol.githubUrl && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Endpoint URL</h2>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded flex justify-between items-center">
                      <code className="text-blue-600 dark:text-blue-400">{protocol.githubUrl}</code>
                      <a 
                        href={protocol.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-500 dark:text-blue-400 hover:text-blue-700"
                        aria-label="Open URL"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar - Right Side (1/3 width) */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold mb-4">Links & Contact</h2>
                
                <div className="space-y-4">
                  {protocol.githubUrl && (
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="currentColor"/>
                      </svg>
                      <a 
                        href={protocol.githubUrl}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 truncate"
                      >
                        {protocol.githubUrl.replace(/^https?:\/\/(www\.)?/, '')}
                      </a>
                    </div>
                  )}
                  
                  {protocol.contactEmail && (
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a 
                        href={`mailto:${protocol.contactEmail}`}
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {protocol.contactEmail}
                      </a>
                    </div>
                  )}
                  
                  {protocol.websiteLink && (
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                      </svg>
                      <a 
                        href={protocol.websiteLink}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 truncate"
                      >
                        {protocol.websiteLink.replace(/^https?:\/\/(www\.)?/, '')}
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Added on {new Date(protocol.createdAt || '').toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold mb-4">Share this protocol:</h2>
                <div className="flex gap-3">
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-gray-700 dark:text-gray-300" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-gray-700 dark:text-gray-300" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-gray-700 dark:text-gray-300" viewBox="0 0 16 16">
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommended Protocols */}
          {recommendedProtocols.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6">Recommended Protocols</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedProtocols.map(rec => (
                  <div key={rec.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      {getProtocolIcon(rec.name, rec.logoUrl)}
                      <Link href={`/protocols/${encodeURIComponent(rec.name.replace(/ /g, '-'))}`}>
                        <h3 className="text-lg font-bold hover:text-green-700 transition-colors line-clamp-1">{rec.name}</h3>
                      </Link>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {rec.description}
                    </p>
                    <Link 
                      href={`/protocols/${encodeURIComponent(rec.name.replace(/ /g, '-'))}`}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 