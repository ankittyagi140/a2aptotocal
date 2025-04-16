'use client'
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import Link from "next/link";
import { Protocol } from '@/types/protocol';

export default function Home() {
  const [, setFeaturedProtocols] = useState<Protocol[]>([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  // Fetch featured protocols on component mount
  useEffect(() => {
    async function fetchFeaturedProtocols() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('protocols')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

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
          createdAt: item.created_at
        })) || [];

        setFeaturedProtocols(mappedData);
      } catch (err) {
        console.error('Error fetching protocols:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch protocols');
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProtocols();
  }, []);

  // Helper function to get protocol icon
  const getProtocolIcon = () => {
    // For now, using a generic server icon
    return (
      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center w-10 h-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2H5z" />
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="pt-20 pb-32 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-br from-blue-600/10 to-green-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tr from-purple-600/10 to-blue-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <div>
            <div className="max-w-xl">
              <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium py-1 px-3 rounded-full mb-4">
                The Future of AI Integration
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">A2A Protocol</span> Directory
            </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-6">
                Discover, compare, and implement the best agent-to-agent protocols for your AI systems. 
                Enable your AI agents to communicate effectively with our curated protocol directory.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center py-4">
              <Link 
                href="/list-your-protocol"
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-8 rounded-lg hover:shadow-lg transition-all flex items-center font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                List Your Protocol
              </Link>
              <Link 
                href="/protocols" 
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 py-3 px-8 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-colors font-medium flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Browse Protocols
              </Link>
            </div>
            
            <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600 font-bold">AI</div>
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-600 font-bold">ML</div>
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs text-purple-600 font-bold">RL</div>
              </div>
              <span>Trusted by 100+ companies and researchers</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-green-600/10 rounded-3xl transform rotate-3 scale-105"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Directory Highlights</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Latest statistics</p>
                  </div>
                </div>
                <div className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                  Live Data
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10+</div>
                  <div className="text-gray-500 dark:text-gray-400">Listed Protocols</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">1k+</div>
                  <div className="text-gray-500 dark:text-gray-400">Active Users</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">99.9%</div>
                  <div className="text-gray-500 dark:text-gray-400">Uptime</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">24/7</div>
                  <div className="text-gray-500 dark:text-gray-400">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium py-1 px-3 rounded-full mb-4">
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Features of A2A Protocol Directory</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our directory provides comprehensive tools to discover, compare, and implement agent-to-agent protocols for seamless AI integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Advanced Protocol Discovery</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Find the perfect A2A protocols for your specific AI agent needs with powerful search, filtering, and recommendation tools.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Verified & Trusted</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Every protocol undergoes thorough verification to ensure security, reliability, and compliance with industry standards.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Side-by-Side Comparison</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Compare different protocols with our detailed matrices to find the perfect match for your specific use case and requirements.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">Detailed Documentation</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Access comprehensive guides, code samples, and implementation strategies for each protocol in our directory.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">Community & Reviews</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Read authentic reviews, participate in discussions, and share your experiences with different protocols.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Developer Resources</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Access APIs, libraries, and SDKs to integrate protocols into your applications with minimal effort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="benefits" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-600/5 to-green-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-purple-600/5 to-blue-600/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium py-1 px-3 rounded-full mb-4">
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Our Directory Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              A streamlined workflow to help you find, evaluate, and implement the perfect A2A protocols for your AI systems.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</div>
                <h3 className="text-xl font-bold mb-2 pl-4">Find the Right Protocol</h3>
                <p className="text-gray-600 dark:text-gray-300 pl-4">
                  Use our powerful search and filtering tools to discover protocols that match your specific AI agent needs and technical requirements.
                    </p>
                  </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">2</div>
                <h3 className="text-xl font-bold mb-2 pl-4">Compare & Evaluate</h3>
                <p className="text-gray-600 dark:text-gray-300 pl-4">
                  Compare multiple protocols side-by-side to assess their features, performance metrics, security standards, and community feedback.
                </p>
                </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">3</div>
                <h3 className="text-xl font-bold mb-2 pl-4">Review Documentation</h3>
                <p className="text-gray-600 dark:text-gray-300 pl-4">
                  Access comprehensive documentation, code examples, and implementation guides to understand how to integrate the protocol.
                </p>
                </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-yellow-600 text-white flex items-center justify-center font-bold text-sm">4</div>
                <h3 className="text-xl font-bold mb-2 pl-4">Implement & Share</h3>
                <p className="text-gray-600 dark:text-gray-300 pl-4">
                  Download libraries, use our SDKs, and follow integration guides to implement the protocol. Share your experience with the community.
                    </p>
                  </div>
                </div>

            <div className="lg:col-span-7 flex justify-center">
              <div className="relative max-w-full">
                {/* Interactive UI demonstration */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Header with tabs */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 border-b border-gray-200 dark:border-gray-600 flex items-center">
                    <div className="flex space-x-2 mr-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex space-x-4 text-sm">
                      <div className="px-3 py-1 bg-white dark:bg-gray-600 rounded text-blue-600 dark:text-blue-200 font-medium">Search</div>
                      <div className="px-3 py-1 text-gray-500 dark:text-gray-300">Compare</div>
                      <div className="px-3 py-1 text-gray-500 dark:text-gray-300">Implement</div>
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="p-6">
                    {/* Search bar */}
                    <div className="mb-6">
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          placeholder="Search protocols by name, features, or tags..."
                          defaultValue="agent communication"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                </div>
              </div>
            </div>

                    {/* Results */}
                    <div className="space-y-4">
                      {/* Protocol card 1 - animated highlight */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 flex items-start animate-pulse">
                        <div className="bg-blue-600 text-white p-2 rounded-lg mr-4 flex-shrink-0">
                          {getProtocolIcon()}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-blue-800 dark:text-blue-200">Agent Communication Protocol</h4>
                          <p className="text-sm text-blue-700 dark:text-blue-300 line-clamp-2">A secure, bi-directional communication protocol optimized for AI agents with built-in authentication.</p>
                        </div>
                      </div>

                      {/* Protocol card 2 */}
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 flex items-start">
                        <div className="bg-gray-200 dark:bg-gray-600 p-2 rounded-lg mr-4 flex-shrink-0">
                          {getProtocolIcon()}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-gray-800 dark:text-gray-200">AI Message Exchange Format</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">Standardized message format for exchanging data between different AI systems.</p>
                        </div>
                      </div>

                      {/* Protocol card 3 */}
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 flex items-start">
                        <div className="bg-gray-200 dark:bg-gray-600 p-2 rounded-lg mr-4 flex-shrink-0">
                          {getProtocolIcon()}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-gray-800 dark:text-gray-200">Secure Agent Protocol</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">End-to-end encrypted protocol with verification mechanisms for sensitive AI communications.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-sm font-medium py-1 px-3 rounded-full mb-4">
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Common Questions</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need to know about our A2A Protocol Directory and how it can help your AI systems communicate effectively.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">What is the A2A Protocol Directory?</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 ml-11">
                  The A2A Protocol Directory is a comprehensive platform for discovering, comparing, and implementing Agent-to-Agent protocols that enable AI systems to communicate and collaborate effectively.
              </p>
            </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">How do I list my protocol?</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 ml-11">
                  Simply click the &quot;List Your Protocol&quot; button on our homepage, fill in the required information about your protocol, and submit for review. Our team will verify the submission before publishing it in the directory.
              </p>
            </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Are all protocols verified?</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 ml-11">
                  Yes, our team reviews all submitted protocols for security, documentation quality, and compliance with industry standards before they&apos;re published. This ensures that every protocol in our directory is trustworthy.
              </p>
            </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Is the directory free to use?</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 ml-11">
                  Basic access to browse and compare protocols is completely free. Premium features like detailed analytics, priority support, and enterprise integrations are available with our subscription plans.
              </p>
            </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">What makes a good A2A protocol?</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 ml-11">
                  A good A2A protocol should be secure, well-documented, standardized, and designed to allow effective communication between different AI systems regardless of underlying frameworks or technology stacks.
              </p>
            </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Can I contribute to existing protocols?</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 ml-11">
                  Yes, many protocols in our directory are open source and welcome community contributions. You can find links to their repositories and contribution guidelines in their detail pages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-64 -top-64 w-96 h-96 bg-white/10 rounded-full"></div>
          <div className="absolute -left-64 -bottom-64 w-96 h-96 bg-white/10 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block bg-white/20 text-white text-sm font-medium py-1 px-3 rounded-full mb-6">
              Get Started Today
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Connect Your AI Agents With the Right Protocol</h2>
            <p className="text-xl mb-8 text-white/80">
              Join thousands of developers who are building the future of AI communication
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/list-your-protocol"
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
              List Your Protocol
              </Link>
              <Link 
                href="/protocols"
                className="bg-transparent hover:bg-white/10 border-2 border-white font-bold py-4 px-8 rounded-lg transition-colors"
              >
              Browse Protocols
              </Link>
        </div>
            
            <div className="mt-12 pt-8 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-white/80">Protocols</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">1k+</div>
                <div className="text-white/80">Users</div>
            </div>
              <div className="text-center">
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-white/80">Uptime</div>
            </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-white/80">Support</div>
            </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
