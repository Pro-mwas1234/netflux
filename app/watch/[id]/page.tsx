// app/watch/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

export default function WatchPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const [media, setMedia] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        // ✅ Use API route (not direct TMDB call)
        const res = await fetch(`/api/media/${params.id}`);
        if (!res.ok) throw new Error('Failed to load media');
        const data = await res.json();
        setMedia(data);
      } catch (err) {
        console.error('Failed to load media', err);
      } finally {
        setLoading(false);
      }
    };
    loadMedia();
  }, [params.id]);

  const openPlayer = () => {
    const type = searchParams.get('type') || 'movie';
    const season = searchParams.get('season') || '1';
    const url = type === 'tv'
      ? `https://www.vidking.net/embed/tv/${params.id}/season/${season}`
      : `https://www.vidking.net/embed/movie/${params.id}`;
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1f1e1d]">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center text-gray-400">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600 mb-4"></div>
            <p>Loading player...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1f1e1d]">
      <Header />
      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link 
              href="/" 
              className="text-red-500 hover:text-red-400 flex items-center gap-2"
            >
              &larr; Back to Home
            </Link>
            <h1 className="text-xl font-bold text-white">
              {media?.title || media?.name}
              {searchParams.get('type') === 'tv' && ` - Season ${searchParams.get('season')}`}
            </h1>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-8 text-center">
            <p className="text-gray-300 mb-6">
              Video will open in a new tab to ensure proper playback
            </p>
            <button
              onClick={openPlayer}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg flex items-center gap-3 mx-auto"
            >
              ▶️ Play Now
            </button>
            <p className="text-gray-500 mt-4 text-sm">
              If the player doesn't open, check your popup blocker
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
