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

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center text-gray-400">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
            <p className="text-xl">Loading player...</p>
          </div>
        </div>
      </div>
    );
  }

  const type = searchParams.get('type') || 'movie';
  const season = searchParams.get('season') || '1';
  const embedUrl = type === 'tv'
    ? `https://www.vidking.net/embed/tv/${params.id}/season/${season}`
    : `https://www.vidking.net/embed/movie/${params.id}`;

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Full-width player container */}
      <div className="w-full max-w-none px-0">
        <div className="aspect-video w-full bg-black">
          <iframe
            src={embedUrl}
            className="w-full h-full min-h-[500px] md:min-h-[600px] lg:min-h-[720px]"
            allowFullScreen
            allow="autoplay; encrypted-media"
            title="Video Player"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      </div>

      {/* Movie info overlay (optional) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {media?.title || media?.name}
            </h1>
            {type === 'tv' && (
              <p className="text-gray-400 mt-1">Season {season}</p>
            )}
          </div>
          <Link 
            href="/" 
            className="text-red-500 hover:text-red-400 flex items-center gap-2 text-lg"
          >
            &larr; Home
          </Link>
        </div>
      </div>
    </div>
  );
}
