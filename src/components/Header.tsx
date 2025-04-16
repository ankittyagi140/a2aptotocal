'use client'
import Image from "next/image";
import Link from "next/link";
interface HeaderProps {
  showSubmitButton?: boolean;
  buttonColor?: string;
}

export default function Header({ 
  showSubmitButton = true, 
 
}: HeaderProps) {
  
  
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
          {showSubmitButton && (
           <Link 
           href="/list-your-protocol"
           className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-3 rounded-lg hover:shadow-lg transition-all flex items-center font-medium"
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