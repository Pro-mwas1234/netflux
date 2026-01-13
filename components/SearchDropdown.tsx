// components/SearchDropdown.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

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
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
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
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-[#141414] border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 animate-fadeIn">
          {results.length > 0 ? (
            <ul className="overflow-y-auto max-h-96">
              {results.map((movie) => (
                <li key={movie.id}>
                  <Link
                    href={`/movie/${movie.id}`}
                    className="flex items-center gap-4 p-3 hover:bg-white/5 transition-colors group"
                    onClick={() => {
                      setQuery('');
                      setIsOpen(false);
                    }}
                  >
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="w-12 h-18 rounded-md object-cover border border-gray-800"
                        width={48}
                        height={72}
                      />
                    ) : (
                      <div className="w-12 h-18 bg-gray-800 rounded-md flex items-center justify-center border border-gray-800">
                        <div className="bg-gray-700 w-8 h-12 rounded-sm"></div>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate text-white group-hover:text-red-500 transition-colors">
                        {movie.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {movie.release_date ? movie.release_date.substring(0, 4) : 'Unknown'}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center">
              <div className="mx-auto bg-gray-800/50 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-gray-400">No movies found</p>
              <p className="text-xs text-gray-500 mt-1">Try different keywords</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
