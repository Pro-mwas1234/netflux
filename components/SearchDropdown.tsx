// components/SearchDropdown.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function SearchDropdown() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch from YOUR API route (not TMDB directly)
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

  // Close dropdown when clicking outside
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
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.trim() && setIsOpen(true)}
        placeholder="Search movies..."
        className="w-full md:w-64 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-[#1f1e1d] border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50 max-h-96">
          {results.length > 0 ? (
            <ul className="overflow-y-auto max-h-96">
              {results.map((movie) => (
                <li key={movie.id}>
                  <Link
                    href={`/movie/${movie.id}`}
                    className="flex items-center gap-3 p-3 hover:bg-white/10 transition-colors"
                    onClick={() => {
                      setQuery('');
                      setIsOpen(false);
                    }}
                  >
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="w-12 h-18 rounded object-cover"
                        width={48}
                        height={72}
                      />
                    ) : (
                      <div className="w-12 h-18 bg-gray-800 rounded flex items-center justify-center">
                        🎬
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{movie.title}</h3>
                      <p className="text-xs text-gray-400">
                        {movie.release_date?.substring(0, 4)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-400">No movies found</div>
          )}
        </div>
      )}
    </div>
  );
}
