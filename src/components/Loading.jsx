import React from 'react'

export default function Loading() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-4 w-full mb-6">
        <div className="w-1/2 h-8 bg-gray-300 animate-pulse rounded"></div>
        <div className="w-1/3 h-4 bg-gray-300 animate-pulse rounded"></div>
      </div>
      <div className="bg-gray-200 rounded-[4px] text-center p-10 w-full mb-6">
        <div className="w-full h-8 bg-gray-300 animate-pulse rounded"></div>
        <div className="w-1/3 h-4 bg-gray-300 animate-pulse rounded mt-2"></div>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-[4px] p-4">
            {[...Array(10)].map((_, idx) => (
              <div key={idx} className="w-full h-4 bg-gray-300 animate-pulse rounded mb-2"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
