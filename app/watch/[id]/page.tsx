// app/watch/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { fetchMovieById } from '@/lib/tmdb';

export default function WatchPage({ params }: { params: { id: string } }) {
  const [media, setMedia] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isTv, setIsTv] = useState(false);
  const [season, setSeason] = useState(1);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        // Extract type and season from URL
        const urlParams = new URLSearchParams(window.location.search);
        const type = urlParams.get('type') || 'movie';
        const seasonNum = parseInt(urlParams.get('season') || '1');
        
        setIsTv(type === 'tv');
        setSeason(seasonNum);
        
        const data = await fetchMovieById(params.id);
        setMedia(data);
      } catch (err) {
        console.error('Failed to load media', err);
      } finally {
        setLoading(false);
      }
    };
    loadMedia();
  }, [params.id]);

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

  const embedUrl = isTv 
    ? `https://www.vidking.net/embed/tv/${params.id}/season/${season}`
    : `https://www.vidking.net/embed/movie/${params.id}`;

  return (
    <div className="min-h-screen bg-[#1f1e1d]">
      <Header />
      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <Link 
              href="/" 
              className="text-red-500 hover:text-red-400 flex items-center gap-2"
            >
              &larr; Back to Home
            </Link>
            <h1 className="text-xl font-bold text-white truncate">
              {media?.title || media?.name}
              {isTv && ` - Season ${season}`}
            </h1>
          </div>
          
          <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allowFullScreen
              allow="autoplay; encrypted-media"
              title="Video Player"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
