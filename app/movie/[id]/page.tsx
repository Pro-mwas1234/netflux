// app/movie/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import TrailerModal from '@/components/TrailerModal';
import Link from 'next/link';
import { fetchMovieById } from '@/lib/tmdb';

export default function MoviePage({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<any>(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      const data = await fetchMovieById(params.id);
      setMovie(data);
    };
    loadMovie();
  }, [params.id]);

  if (!movie) return <div className="text-center mt-20">Loading...</div>;

  // Find first YouTube trailer
  const trailer = movie.videos?.results?.find(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  return (
    <div className="movie-detail">
      <Link href="/" className="back-link">&larr; Back to Home</Link>
      
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      
      {trailer && (
        <button
          onClick={() => setIsTrailerOpen(true)}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
          ▶️ Watch Trailer
        </button>
      )}

      {/* Where to watch */}
      <div className="mt-6">
        <h2>Where to Watch</h2>
        <p>Stream on: Netflix, Prime Video, or Disney+</p>
      </div>

      {/* Trailer Modal */}
      {trailer && (
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          videoId={trailer.key}
        />
      )}
    </div>
  );
}
