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

  const type = searchParams.get('type') || 'movie';
  const season = searchParams.get('season') || '1';
  const embedUrl = type === 'tv'
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
              {type === 'tv' && ` - Season ${season}`}
            </h1>
          </div>
          
          {/* ✅ 16:9 ASPECT RATIO */}
          <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allowFullScreen
              allow="autoplay; encrypted-media"
              title="Video Player"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
