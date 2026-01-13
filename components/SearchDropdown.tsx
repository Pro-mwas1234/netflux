// components/SearchDropdown.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function SearchDropdown() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
        setResults(data.results?.slice(0, 20) || []);
        setIsOpen(true);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ position: 'relative', width: '100%', maxWidth: '256px' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim() && setIsOpen(true)}
            placeholder="Search movies..."
            style={{
              width: '100%',
              padding: '8px 32px 8px 32px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid #444',
              borderRadius: '9999px',
              color: 'white',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <div style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#888',
            fontSize: '14px'
          }}>
            🔍
          </div>
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#888',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: '80px',
            overflowY: 'auto'
          }}
          onClick={() => setIsOpen(false)}
        >
          <div 
            style={{
              width: '90%',
              maxWidth: '1400px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '24px',
              padding: '20px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {results.length > 0 ? (
              results.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  onClick={() => {
                    setQuery('');
                    setIsOpen(false);
                  }}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <div style={{
                    position: 'relative',
                    paddingBottom: '150%',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '2px solid transparent',
                  }}>
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#222',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#555'
                      }}>
                        No Poster
                      </div>
                    )}
                  </div>
                  <div style={{
                    marginTop: '12px',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '1.3',
                    height: '48px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {movie.title}
                  </div>
                </Link>
              ))
            ) : (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                color: '#888',
                fontSize: '24px',
                padding: '40px'
              }}>
                No movies found for "{query}"
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
