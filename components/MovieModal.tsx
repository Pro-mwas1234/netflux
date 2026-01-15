// components/MovieModal.tsx
'use client';

import { useState, useEffect } from 'react';

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaId: string;
  type: 'movie' | 'tv';
}

export default function MovieModal({ isOpen, onClose, mediaId, type }: MovieModalProps) {
  const [media, setMedia] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState<number>(1);

  useEffect(() => {
    if (!isOpen) {
      setMedia(null);
      setLoading(true);
      return;
    }

    setLoading(true);
    const loadMedia = async () => {
      try {
        const res = await fetch(`/api/media/${mediaId}`);
        if (!res.ok) throw new Error('Failed to load media');
        const data = await res.json();
        setMedia(data);
        if (type === 'tv' && data.number_of_seasons) {
          setSelectedSeason(1);
        }
      } catch (err) {
        console.error('Failed to load media', err);
      } finally {
        setLoading(false);
      }
    };
    loadMedia();
  }, [isOpen, mediaId, type]);

  // ✅ Keep overflow: hidden for proper modal behavior
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = '';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEscape);
      return () => {
        window.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* ✅ Full-height scrollable container */}
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-xl border border-gray-800 shadow-2xl hide-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-red-600 mb-3"></div>
            <p className="text-sm">Loading details...</p>
          </div>
        ) : media?.error ? (
          <div className="p-8 text-center text-red-400 text-sm">Failed to load media</div>
        ) : media ? (
          <div className="p-5">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="md:w-1/3 flex-shrink-0">
                <img
                  src={
                    media.poster_path
                      ? `https://image.tmdb.org/t/p/w300${media.poster_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Poster'
                  }
                  alt={media.title || media.name}
                  className="w-full rounded-lg shadow-md"
                />
              </div>

              <div className="md:w-2/3">
                <h2 className="text-xl font-bold mb-2 text-white">
                  {media.title || media.name}
                </h2>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-gray-800 px-2 py-1 rounded text-xs text-gray-300">
                    ⭐ {media.vote_average?.toFixed(1)}/10
                  </span>
                  <span className="bg-gray-800 px-2 py-1 rounded text-xs text-gray-300">
                    📅 {media.release_date?.substring(0, 4) || media.first_air_date?.substring(0, 4)}
                  </span>
                  {type === 'tv' && media.number_of_seasons && (
                    <span className="bg-gray-800 px-2 py-1 rounded text-xs text-gray-300">
                      📺 {media.number_of_seasons} Season{media.number_of_seasons > 1 ? 's' : ''}
                    </span>
                  )}
                  {type === 'movie' && media.runtime && (
                    <span className="bg-gray-800 px-2 py-1 rounded text-xs text-gray-300">
                      🎬 {media.runtime}m
                    </span>
                  )}
                </div>

                <div className="text-gray-400 text-sm mb-6">
                  {media.overview || 'No description available.'}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-red-400 text-sm">No data available</div>
        )}

        {/* ✅ STICKY ACTION BAR - Always visible */}
        {media && !loading && (
          <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 p-4">
            {type === 'movie' ? (
              <a
                href={`https://www.vidking.net/embed/movie/${mediaId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors text-base"
              >
                ▶️ Play Movie
              </a>
            ) : type === 'tv' && media.number_of_seasons ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(Number(e.target.value))}
                  className="bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:ring-2 focus:ring-red-500 text-base"
                >
                  {Array.from({ length: media.number_of_seasons }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Season {i + 1}
                    </option>
                  ))}
                </select>
                <a
                  href={`https://www.vidking.net/embed/tv/${mediaId}/season/${selectedSeason}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto block text-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors text-base"
                >
                  Watch Season {selectedSeason}
                </a>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
