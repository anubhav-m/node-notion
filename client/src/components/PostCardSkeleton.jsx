export default function PostCardSkeleton() {
  return (
    <div className='w-full border border-gray-200 dark:border-gray-700 h-[400px] overflow-hidden rounded-lg sm:w-[370px] animate-pulse'>
      {/* Image Skeleton */}
      <div className='h-[260px] w-full bg-gray-300 dark:bg-gray-700' />
      
      <div className='p-3 flex flex-col gap-4'>
        {/* Title Skeleton */}
        <div className='space-y-2'>
          <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded w-full' />
          <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4' />
        </div>
        
        {/* Category Skeleton */}
        <div className='h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4 italic' />
        
        {/* Button Placeholder (Optional, just to match space) */}
        <div className='mt-4 h-10 bg-gray-200 dark:bg-gray-800 rounded-md w-full opacity-50' />
      </div>
    </div>
  );
}
