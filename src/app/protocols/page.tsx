'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '../../utils/supabase';
import { Protocol } from '../../types/protocol';
import toast from 'react-hot-toast';
import ProtocolCardSkeleton from '@/components/ProtocolCardSkeleton';

export default function ProtocolsPage() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const protocolsPerPage = 9;

  // Fetch protocols on component mount
  useEffect(() => {
    async function fetchProtocols() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('protocols')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (error) {
          throw new Error(error.message);
        }

        // Map snake_case database columns to camelCase properties
        const mappedData = data?.map(item => ({
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
        })) || [];

        setProtocols(mappedData);

        // Extract all unique tags
        const tags = mappedData.reduce((acc: string[], protocol: Protocol) => {
          if (protocol.tags) {
            const protocolTags = protocol.tags.split(',').map(tag => tag.trim());
            protocolTags.forEach(tag => {
              if (tag && !acc.includes(tag)) {
                acc.push(tag);
              }
            });
          }
          return acc;
        }, []);

        setAllTags(tags || []);
      } catch (err) {
        console.error('Error fetching protocols:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch protocols');
        
        // Show error toast with red styling
        toast.error(err instanceof Error ? err.message : 'Failed to fetch protocols', {
          style: {
            borderRadius: '10px',
            background: '#B91C1C', // Red-700 from Tailwind
            color: '#fff',
          },
          icon: '❌',
          duration: 6000
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProtocols();
  }, []);

  // Filter protocols based on search term and selected tags
  const filteredProtocols = protocols.filter(protocol => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      protocol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      protocol.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (protocol.tags && protocol.tags.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by selected tags
    const matchesTags = selectedTags.length === 0 || 
      (protocol.tags && selectedTags.every(tag => 
        protocol.tags.toLowerCase().includes(tag.toLowerCase())
      ));
    
    return matchesSearch && matchesTags;
  });

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle search input
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the filteredProtocols effect
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Get current protocols for pagination
  const indexOfLastProtocol = currentPage * protocolsPerPage;
  const indexOfFirstProtocol = indexOfLastProtocol - protocolsPerPage;
  const currentProtocols = filteredProtocols.slice(indexOfFirstProtocol, indexOfLastProtocol);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredProtocols.length / protocolsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Generate pagination range with ellipsis
  const getPaginationRange = (currentPage: number, totalPages: number): (number | string)[] => {
    const delta = 1; // Number of pages to show on each side of current page
    const range: (number | string)[] = [];
    
    // Always show first page
    range.push(1);
    
    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);
    
    // Add ellipsis before range if needed
    if (rangeStart > 2) {
      range.push("...");
    }
    
    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      range.push(i);
    }
    
    // Add ellipsis after range if needed
    if (rangeEnd < totalPages - 1) {
      range.push("...");
    }
    
    // Always show last page if more than 1 page
    if (totalPages > 1) {
      range.push(totalPages);
    }
    
    return range;
  };

  // Get protocol icon based on name (updated with logo support)
  const getProtocolIcon = (protocol: Protocol) => {
    if (protocol.logoUrl) {
      return (
        <Image 
          src={protocol.logoUrl} 
          alt={`${protocol.name} logo`} 
          width={40} 
          height={40}
          className="rounded-md object-cover"
        />
      );
    }
    
    // Use default A2A protocol logo
    return (
      <Image 
        src="/a2a_protocol.png" 
        alt="A2A Protocol logo" 
        width={40} 
        height={40}
        className="rounded-md object-cover"
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-white-50 dark:bg-gray-900">
        <div className="container py-8 px-4 mx-auto">
          <h1 className="text-3xl font-bold mb-8">Browse A2A Protocols</h1>

          {/* Search Bar */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search protocols by name, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <button 
                type="submit" 
                className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Filter Tags */}
          {allTags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTags.includes(tag)
                        ? 'bg-green-700 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <ProtocolCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : filteredProtocols.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No protocols found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {protocols.length === 0 
                  ? "No protocols have been submitted yet. Be the first to submit one!"
                  : "No protocols match your current search criteria. Try adjusting your filters."}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProtocols.map((protocol) => (
                  <div key={protocol.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        {getProtocolIcon(protocol)}
                        <Link href={`/protocols/${encodeURIComponent(protocol.name.replace(/ /g, '-'))}`}>
                          <h2 className="text-xl font-bold hover:text-green-700 transition-colors line-clamp-1">{protocol.name}</h2>
                        </Link>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">
                        {protocol.description}
                      </p>
                      
                      {protocol.tags && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {protocol.tags.split(',').slice(0, 3).map((tag, index) => (
                            <span 
                              key={index} 
                              className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                          {protocol.tags.split(',').length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded">
                              +{protocol.tags.split(',').length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex space-x-2 mt-4">
                        <Link 
                          href={`/protocols/${encodeURIComponent(protocol.name.replace(/ /g, '-'))}`} 
                          className="flex-1 text-center py-2 px-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          View Details
                        </Link>
                        {protocol.githubUrl && (
                          <a 
                            href={protocol.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            aria-label="GitHub Repository"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="currentColor"/>
                            </svg>
                          </a>
                        )}
                        {protocol.websiteLink && (
                          <a 
                            href={protocol.websiteLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center px-3 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition-colors"
                            aria-label="Visit Website"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-1">
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
                      aria-label="Previous page"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {getPaginationRange(currentPage, totalPages).map((pageNum) => {
                      if (pageNum === "...") {
                        return (
                          <span key={`ellipsis-${Math.random()}`} className="w-8 h-8 flex items-center justify-center text-gray-500">
                            ...
                          </span>
                        );
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => paginate(pageNum as number)}
                          className={`w-8 h-8 flex items-center justify-center rounded-sm ${
                            currentPage === pageNum
                              ? 'bg-green-700 text-white'
                              : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
                      aria-label="Next page"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
} 