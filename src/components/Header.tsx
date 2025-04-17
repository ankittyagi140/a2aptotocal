'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface HeaderProps {
  showSubmitButton?: boolean;
  buttonColor?: string;
}

export default function Header({ 
  showSubmitButton = true, 
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (mobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    
    // Prevent scrolling when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);
  
  return (
    <header className="py-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-50">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/a2a_protocol.png" 
            alt="A2A Protocal Logo" 
            width={48} 
            height={48}
            className="rounded-md"
            priority
          />
          <span className="text-2xl font-bold text-gradient">A2A Protocal</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="flex items-center gap-1 hover:text-green-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
              </svg>
              <span>Home</span>
            </Link>
            <Link href="/#features" className="flex items-center gap-1 hover:text-green-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span>Features</span>
            </Link>
            <Link href="/#benefits" className="flex items-center gap-1 hover:text-green-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Benefits</span>
            </Link>
            <Link href="/#faq" className="flex items-center gap-1 hover:text-green-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>FAQ</span>
            </Link>
            <Link href="/protocols" className="flex items-center gap-1 hover:text-green-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              <span>Browse</span>
            </Link>
          </nav>
          
          {/* Hamburger button - visible only on mobile */}
          <button 
            className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
          
          {/* Mobile menu overlay */}
          <div 
            className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
              mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden="true"
          />
          
          {/* Mobile menu slide-in panel */}
          <div 
            className={`fixed top-0 right-0 bottom-0 w-64 sm:w-80 bg-white dark:bg-gray-900 z-50 shadow-xl transform transition-transform duration-300 ease-in-out mobile-menu ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                  <Image 
                    src="/a2a_protocol.png" 
                    alt="A2A Protocal Logo" 
                    width={32} 
                    height={32}
                    className="rounded-md"
                  />
                  <span className="text-lg font-bold text-gradient">A2A Protocal</span>
                </Link>
                <button 
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              </div>
              
              <nav className="flex-1 overflow-y-auto py-4">
                <div className="px-4 space-y-6">
                  <Link 
                    href="/" 
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
                    </svg>
                    <span>Home</span>
                  </Link>
                  <Link 
                    href="/#features" 
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span>Features</span>
                  </Link>
                  <Link 
                    href="/#benefits" 
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Benefits</span>
                  </Link>
                  <Link 
                    href="/#faq" 
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>FAQ</span>
                  </Link>
                  <Link 
                    href="/protocols" 
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <span>Browse</span>
                  </Link>
                </div>
              </nav>
              
              {showSubmitButton && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                  <Link 
                    href="/list-your-protocol"
                    className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all flex items-center justify-center font-medium w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    List Your Protocol
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Desktop submit button */}
          {showSubmitButton && (
           <Link 
             href="/list-your-protocol"
             className="hidden md:flex bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-3 rounded-lg hover:shadow-lg transition-all items-center font-medium"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
             </svg>
             List Your Protocol
           </Link>
          )}
        </div>
      </div>
    </header>
  );
} 