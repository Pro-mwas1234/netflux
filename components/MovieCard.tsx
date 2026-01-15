// components/MovieCard.tsx
'use client';

import { useState, useEffect } from 'react';
import MovieModal from './MovieModal';

let globalModalOpen = false;

export default function MovieCard({ movie, type = "movie" }: { movie: any; type?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleGlobalModalOpen = () => {
      if (isModalOpen) setIsModalOpen(false);
    };

    if (isModalOpen) {
      globalModalOpen = true;
      window.addEventListener('global-modal-open', handleGlobalModalOpen);
    }

    return () => {
      window.removeEventListener('global-modal-open', handleGlobalModalOpen);
    };
  }, [isModalOpen]);

  const openModal = () => {
    if (globalModalOpen) {
      window.dispatchEvent(new Event('global-modal-open'));
    }
    globalModalOpen = true;
    setIsModalOpen(true);
  };

  const closeModal = () => {
    globalModalOpen = false;
    setIsModalOpen(false);
  };

  return (
    <>
      <div 
        className="movie-card"
        onClick={openModal}
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
        onClose={closeModal}
        mediaId={movie.id.toString()}
        type={type as 'movie' | 'tv'}
      />
    </>
  );
}
