// components/MovieCard.tsx
'use client';

import { useState } from 'react';
import MovieModal from './MovieModal';

export default function MovieCard({ movie, type = "movie" }: { movie: any; type?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="movie-card cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Poster'
          }
          alt={movie.title || movie.name}
        />
        {type === "tv" && (
          <div className="tv-badge">TV</div>
        )}
      </div>

      <MovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mediaId={movie.id.toString()}
        type={type as 'movie' | 'tv'}
      />
    </>
  );
}
