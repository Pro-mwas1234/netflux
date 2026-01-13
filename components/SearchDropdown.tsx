// components/SearchDropdown.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid'; // ← Smaller icons

export default function SearchDropdown() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch from your API route
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results?.slice(0, 8) || []);
        setIsOpen(true);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <MagnifyingGlassIcon 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" 
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder="Search movies..."
          className="w-full md:w-64 bg-black/30 backdrop-blur-sm border border-gray-700 rounded-full py-2 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <XMarkIcon className="w-4 h-4" /> {/* Smaller clear icon */}
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-[#141414] border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 animate-fadeIn">
          {results.length > 0 ? (
            // 👇 HORIZONTAL SCROLLABLE GRID
            <div className="p-3 pb-1">
              <div className="hide-scrollbar flex space-x-3 overflow-x-auto pb-2">
                {results.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movie/${movie.id}`}
                    className="flex-shrink-0 w-32 group"
                    onClick={() => {
                      setQuery('');
                      setIsOpen(false);
                    }}
                  >
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full rounded-md object-cover border border-gray-800"
                        width={128}
                        height={192}
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-800 rounded-md flex items-center justify-center border border-gray-800">
                        <div className="bg-gray-700 w-8 h-12 rounded-sm"></div>
                      </div>
                    )}
                    <h3 className="mt-2 text-xs font-medium text-white group-hover:text-red-500 line-clamp-2">
                      {movie.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <div className="mx-auto bg-gray-800/50 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
              </div>
              <p className="text-gray-400 text-sm">No movies found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
