// components/SearchDropdown.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';

export default function SearchDropdown() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch results
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
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder="Search movies..."
          className="block w-full md:w-64 pl-10 pr-10 py-2 bg-black/30 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-500"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full md:w-64 bg-[#141414] border border-gray-800 rounded-xl shadow-2xl z-50 max-h-80 overflow-hidden">
          {results.length > 0 ? (
            <div className="p-2">
              <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
                {results.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movie/${movie.id}`}
                    className="flex-shrink-0 w-32"
                    onClick={() => {
                      setQuery('');
                      setIsOpen(false);
                    }}
                  >
                    <div className="aspect-[2/3] bg-gray-800 rounded-md overflow-hidden">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-900">
                          <span className="text-gray-600 text-xs">No Poster</span>
                        </div>
                      )}
                    </div>
                    <h3 className="mt-2 text-xs text-white line-clamp-2 px-1">
                      {movie.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-400 text-sm">
              No movies found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
