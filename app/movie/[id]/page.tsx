// app/movie/[id]/page.tsx
'use client'; // ← Add this

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchMovieById } from '@/lib/tmdb';

export async function generateStaticParams() {
  return [];
}

export default function MoviePage({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await fetchMovieById(params.id);
        setMovie(data);
      } catch (err) {
        console.error('Failed to load movie', err);
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1f1e1d] text-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600 mb-4"></div>
          <p>Loading movie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1f1e1d] text-white p-4 md:p-8">
      <Link href="/" className="back-link">
        &larr; Back to Home
      </Link>
      
      {showPlayer ? (
        // ✅ EMBEDDED PLAYER
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{movie.title}</h1>
            <button 
              onClick={() => setShowPlayer(false)}
              className="text-gray-400 hover:text-white text-2xl"
            >
              &times;
            </button>
          </div>
          <div className="aspect-video w-full bg-black rounded-xl overflow-hidden">
            <iframe
              src={`https://www.vidking.net/embed/movie/${params.id}`}
              className="w-full h-full"
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      ) : (
        // DETAILS VIEW
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Poster'
                }
                alt={movie.title}
                className="rounded-lg w-full"
              />
            </div>
            <div className="md:col-span-3">
              <p className="text-gray-300 mb-4">{movie.overview}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                <span>📅 {movie.release_date?.substring(0, 4)}</span>
                <span>🎬 {movie.runtime} min</span>
              </div>
              
              <button
                onClick={() => setShowPlayer(true)}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded flex items-center gap-2"
              >
                ▶️ Play Movie
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
