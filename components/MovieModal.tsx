// components/MovieModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { fetchMovieById } from '@/lib/tmdb';

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
        const data = await fetchMovieById(mediaId);
        setMedia(data);
      } catch (err) {
        console.error('Failed to load media', err);
      } finally {
        setLoading(false);
      }
    };
    loadMedia();
  }, [isOpen, mediaId]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={onClose}
    >
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
          <div className="p-8 text-center text-gray-400">Loading details...</div>
        ) : media ? (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Poster */}
              <div className="md:w-1/3 flex-shrink-0">
                <img
                  src={
                    media.poster_path
                      ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
                      : 'https://via.placeholder.com/500x750?text=No+Poster'
                  }
                  alt={media.title || media.name}
                  className="w-full rounded-lg"
                />
              </div>

              {/* Details */}
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-2">
                  {media.title || media.name}
                </h2>
                
                <div className="flex flex-wrap gap-4 mb-4 text-gray-300">
                  <span>⭐ {media.vote_average?.toFixed(1)}</span>
                  <span>📅 {media.release_date?.substring(0, 4) || media.first_air_date?.substring(0, 4)}</span>
                  {type === 'tv' && (
                    <span>📺 {media.number_of_seasons} Seasons</span>
                  )}
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {media.overview}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {type === 'movie' ? (
                    <a
                      href={`https://moviesapi.to/movie/${mediaId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded flex items-center gap-2"
                    >
                      ▶️ Play Movie
                    </a>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <select
                        value={selectedSeason}
                        onChange={(e) => setSelectedSeason(Number(e.target.value))}
                        className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700"
                      >
                        {Array.from({ length: media.number_of_seasons || 1 }).map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Season {i + 1}
                          </option>
                        ))}
                      </select>
                      <a
                        href={`https://moviesapi.to/tv/${mediaId}/season/${selectedSeason}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded text-center"
                      >
                        Watch Season {selectedSeason}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-red-400">Failed to load media details</div>
        )}
      </div>
    </div>
  );
}
