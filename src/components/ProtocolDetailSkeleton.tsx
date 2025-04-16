export default function ProtocolDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Back button skeleton */}
      <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content - Left Side (2/3 width) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {/* Header with logo and title */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
            
            {/* Description section */}
            <div className="mb-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
              </div>
            </div>
            
            {/* Features section */}
            <div className="mb-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
              <div className="pl-5 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
            
            {/* Endpoint URL section */}
            <div className="mb-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-36 mb-2"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </div>
          </div>
        </div>
        
        {/* Sidebar - Right Side (1/3 width) */}
        <div className="space-y-6">
          {/* Links & Contact */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4"></div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
              </div>
            </div>
            
            <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
          
          {/* Share section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4"></div>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recommended Protocols */}
      <div className="mt-12">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
              </div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 