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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
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
      onClick={onClose} // Close on outside click
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-xl border border-gray-700 shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {loading ? (
          <div className="p-12 text-center text-gray-400">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600 mb-4"></div>
            <p>Loading details...</p>
          </div>
        ) : media?.error ? (
          <div className="p-12 text-center text-red-400">Failed to load media</div>
        ) : media ? (
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 flex-shrink-0">
                <img
                  src={
                    media.poster_path
                      ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
                      : 'https://via.placeholder.com/500x750?text=No+Poster'
                  }
                  alt={media.title || media.name}
                  className="w-full rounded-lg shadow-xl"
                />
              </div>

              <div className="md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                  {media.title || media.name}
                </h2>
                
                <div className="flex flex-wrap gap-4 mb-5 text-gray-300">
                  <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                    ⭐ {media.vote_average?.toFixed(1)}/10
                  </span>
                  <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                    📅 {media.release_date?.substring(0, 4) || media.first_air_date?.substring(0, 4)}
                  </span>
                  {type === 'tv' && media.number_of_seasons && (
                    <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                      📺 {media.number_of_seasons} Season{media.number_of_seasons > 1 ? 's' : ''}
                    </span>
                  )}
                  {type === 'movie' && media.runtime && (
                    <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                      🎬 {media.runtime} min
                    </span>
                  )}
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                  {media.overview || 'No description available.'}
                </p>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-800">
                  {type === 'movie' ? (
                    <a
                      href={`https://moviesapi.to/movie/${mediaId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg flex items-center gap-2 transition-colors shadow-lg hover:shadow-red-900/30"
                    >
                      ▶️ Play Movie
                    </a>
                  ) : type === 'tv' && media.number_of_seasons ? (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <select
                        value={selectedSeason}
                        onChange={(e) => setSelectedSeason(Number(e.target.value))}
                        className="bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 min-w-[140px] focus:ring-2 focus:ring-red-500"
                      >
                        {Array.from({ length: media.number_of_seasons }).map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Season {i + 1}
                          </option>
                        ))}
                      </select>
                      <a
                        href={`https://moviesapi.to/tv/${mediaId}/season/${selectedSeason}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-red-900/30"
                      >
                        Watch Season {selectedSeason}
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-red-400">No data available</div>
        )}
      </div>
    </div>
  );
}
