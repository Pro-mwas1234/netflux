// app/movie/[id]/page.tsx
import { fetchMovieById } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';

// ✅ Remove generateStaticParams() entirely

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await fetchMovieById(params.id);
  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : 'https://via.placeholder.com/1280x720?text=No+Backdrop';
  const trailer = movie.videos?.results?.find(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* ... rest of your JSX (unchanged) ... */}
    </div>
  );
}
