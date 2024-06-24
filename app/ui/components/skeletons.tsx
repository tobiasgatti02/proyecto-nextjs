
import React from 'react';

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton({ cardWidth }: { cardWidth: string }) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
        style={{ width: cardWidth, height: 'auto' }} 
      >
        <div className="flex p-4 mb-10">
          <div className="h-5 w-5 rounded-md bg-gray-200" />
          <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
        </div>
        <div className="flex items-center justify-center truncate rounded-xl bg-white px-10 py-10">
          <div className="h-60 w-60 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
