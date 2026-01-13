// components/SearchDropdown.tsx
'use client';

import { useState, useEffect, useRef } from ' 'react';
import Link from 'next/link';

export default function SearchDropdown() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ... your search logic ...

  // ✅ MUST RETURN JSX
  return (
    <div className="relative" ref={containerRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full md:w-64 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-[#1f1e1d] border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50">
          <ul>
            {results.map((movie) => (
              <li key={movie.id}>
                <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
