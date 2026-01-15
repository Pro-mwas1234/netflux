// app/series/[id]/page.tsx
'use client'; // ← Add this

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchMovieById } from '@/lib/tmdb';

export async function generateStaticParams() {
  return [];
}

export default function SeriesPage({ params }: { params: { id: string } }) {
  const [series, setSeries] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const loadSeries = async () => {
      try {
        const data = await fetchMovieById(params.id);
        setSeries(data);
        if (data.number_of_seasons) {
          setSelectedSeason(1);
        }
      } catch (err) {
        console.error('Failed to load series', err);
      } finally {
        setLoading(false);
      }
    };
    loadSeries();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1f1e1d] text-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600 mb-4"></div>
          <p>Loading series...</p>
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
            <h1 className="text-2xl font-bold">
              {series.name} - Season {selectedSeason}
            </h1>
            <button 
              onClick={() => setShowPlayer(false)}
              className="text-gray-400 hover:text-white text-2xl"
            >
              &times;
            </button>
          </div>
          <div className="aspect-video w-full bg-black rounded-xl overflow-hidden">
            <iframe
              src={`https://www.vidking.net/embed/tv/${params.id}/season/${selectedSeason}`}
              className="w-full h-full"
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      ) : (
        // DETAILS VIEW
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{series.name || series.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <img
                src={
                  series.poster_path
                    ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Poster'
                }
                alt={series.name}
                className="rounded-lg w-full"
              />
            </div>
            <div className="md:col-span-3">
              <p className="text-gray-300 mb-4">{series.overview}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <span>⭐ {series.vote_average?.toFixed(1)}</span>
                <span>📅 {series.first_air_date?.substring(0, 4)}</span>
                <span>📺 {series.number_of_seasons} Seasons</span>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <h3 className="font-bold mb-2">Seasons</h3>
                <div className="flex flex-wrap gap-2">
                  {[...Array(series.number_of_seasons || 1)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setSelectedSeason(i + 1)}
                      className={`px-3 py-1 rounded text-sm ${
                        selectedSeason === i + 1 
                          ? 'bg-red-600' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      Season {i + 1}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => setShowPlayer(true)}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded"
              >
                Watch Season {selectedSeason}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
