'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#3A1E1A] flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md bg-white border border-[#E8DEC8] p-8 rounded-3xl shadow-xl space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#3A1E1A]">Something went wrong</h2>
        <p className="text-xs text-[#755D58]">{error?.message || 'An unexpected error occurred.'}</p>
        <button
          onClick={() => reset()}
          className="w-full py-3 bg-[#5C332D] text-white font-bold rounded-xl text-xs hover:bg-[#4A2823] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
