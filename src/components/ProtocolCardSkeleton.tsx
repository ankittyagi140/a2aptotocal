export default function ProtocolCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow animate-pulse">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          {/* Protocol logo skeleton */}
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          {/* Protocol name skeleton */}
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
        
        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-1 mb-4">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
        </div>
        
        {/* Buttons skeleton */}
        <div className="flex space-x-2 mt-4">
          <div className="flex-1 h-9 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
} 