import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-white-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          {/* Hero section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About A2A Protocol Directory</h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Creating the standard for agent-to-agent communication in the AI ecosystem
            </p>
          </div>

          {/* Mission section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The A2A Protocol Directory was created to address a critical need in the evolving AI landscape: standardizing how AI agents communicate with each other. 
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our mission is to create a comprehensive, open resource where developers, researchers, and organizations can discover, share, and implement protocols that enable seamless agent-to-agent interactions.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                We believe that by establishing common communication standards, we can accelerate the development of interoperable AI systems and unlock new possibilities for collaborative intelligence.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <Image
                  src="/a2a_protocol.png"
                  alt="A2A Protocol Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Why A2A Protocols section */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 md:p-12 mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Why A2A Protocols Matter</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Interoperability</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Standardized protocols enable AI agents from different developers to communicate seamlessly, fostering an ecosystem of complementary AI capabilities.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Security & Trust</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Well-defined protocols establish boundaries and permissions, creating safer agent interactions with predictable behaviors and outcomes.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  By establishing common communication frameworks, developers can focus on creating specialized capabilities rather than reinventing basic interaction patterns.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">How Our Directory Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-4">1</div>
                    <h3 className="text-xl font-semibold">Discovery</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 pl-14">
                    Browse our curated directory of A2A protocols to find solutions that match your needs. Filter by tags, features, or search for specific capabilities.
                  </p>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-4">2</div>
                    <h3 className="text-xl font-semibold">Implementation</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 pl-14">
                    Each protocol listing includes comprehensive documentation, implementation examples, and links to resources to help you integrate the protocol into your systems.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-4">3</div>
                    <h3 className="text-xl font-semibold">Contribution</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 pl-14">
                    Developed your own protocol? Share it with the community through our submission process, helping to expand the ecosystem of interoperable AI agents.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-6">Our Commitment to Quality</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Every protocol in our directory undergoes a thorough review process to ensure:
                </p>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Proper documentation and clear implementation guidelines</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Technical soundness and adherence to best practices</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Potential for meaningful contribution to the A2A ecosystem</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Security considerations and responsible AI principles</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action section */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Join the A2A Protocol Community</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Whether you&apos;re developing AI agents, researching multi-agent systems, or implementing AI solutions, the A2A Protocol Directory is your resource for standardized agent communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/protocols" 
                className="bg-white text-green-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Browse Protocols
              </Link>
              <Link 
                href="/list-your-protocol" 
                className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Submit Your Protocol
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 