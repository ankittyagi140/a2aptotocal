'use client'

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmissionSuccess() {
  const router = useRouter();

  // Redirect to home if accessed directly without a submission
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 60000); // Auto redirect after 1 minute

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8 mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Submission Received!</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <p className="text-lg mb-6">
            Thank you for submitting your protocol to A2A Protocal! Your submission is now pending review by our team.
          </p>
          
          <div className="border-l-4 border-blue-500 pl-4 py-2 mb-6 text-left">
            <h2 className="font-semibold text-lg mb-2">What happens next?</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Our team will review your submission within 2-3 business days</li>
              <li>You&apos;ll receive an email notification once your protocol is approved</li>
              <li>Your protocol will then be published in our directory</li>
            </ol>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg mb-6 text-left">
            <p className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              If you need to make changes to your submission or have questions, please contact us at <a href="mailto:a2aprotocal@gmail.com" className="underline">a2aprotocal@gmail.com</a>
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/"
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-8 rounded-lg hover:shadow-lg transition-all flex items-center font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
            </svg>
            Return to Home
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
      </div>
    </div>
  );
} 