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
    if (!isOpen) return;
    
    setLoading(true);
    const loadMedia = async () => {
      try {
        const res = await fetch(`/api/media/${mediaId}`);
        if (!res.ok) throw new Error('Failed to load media');
        const data = await res.json();
        setMedia(data);
        // Set default season for TV shows
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

  if (!isOpen) return null;

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1f1e1d] rounded-xl border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white text-2xl hover:text-gray-300"
        >
          &times;
        </button>

        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading details...</div>
        ) : media?.error ? (
          <div className="p-12 text-center text-red-400">Failed to load media</div>
        ) : media ? (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Poster */}
              <div className="md:w-1/3 flex-shrink-0">
                <img
                  src={
                    media.poster_path
                      ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
                      : 'https://via.placeholder.com/500x750?text=No+Poster'
                  }
                  alt={media.title || media.name}
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>

              {/* Details */}
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-3">
                  {media.title || media.name}
                </h2>
                
                <div className="flex flex-wrap gap-4 mb-5 text-gray-300">
                  <span>⭐ {media.vote_average?.toFixed(1)}/10</span>
                  <span>📅 {media.release_date?.substring(0, 4) || media.first_air_date?.substring(0, 4)}</span>
                  {type === 'tv' && media.number_of_seasons && (
                    <span>📺 {media.number_of_seasons} Season{media.number_of_seasons > 1 ? 's' : ''}</span>
                  )}
                  {type === 'movie' && media.runtime && (
                    <span>🎬 {media.runtime} min</span>
                  )}
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                  {media.overview || 'No description available.'}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-800">
                  {type === 'movie' ? (
                    <a
                      href={`https://moviesapi.to/movie/${mediaId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded flex items-center gap-2 transition-colors"
                    >
                      ▶️ Play Movie
                    </a>
                  ) : type === 'tv' && media.number_of_seasons ? (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <select
                        value={selectedSeason}
                        onChange={(e) => setSelectedSeason(Number(e.target.value))}
                        className="bg-gray-800 text-white px-4 py-2.5 rounded border border-gray-700 min-w-[140px]"
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
                        className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors"
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
