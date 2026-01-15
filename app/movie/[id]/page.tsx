// app/movie/[id]/page.tsx
import Link from 'next/link';
import { fetchMovieById } from '@/lib/tmdb';

// ✅ Required for Vercel dynamic routes
export async function generateStaticParams() {
  return []; // Allows all paths like /movie/550
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await fetchMovieById(params.id);

  return (
    <div className="min-h-screen bg-[#1f1e1d] text-white p-4 md:p-8">
      <Link href="/" className="back-link">
        &larr; Back to Home
      </Link>
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://via.placeholder.com/500x750?text=No+Poster'
              }
              alt={movie.title}
              className="rounded-lg w-full"
            />
          </div>
          <div className="md:col-span-3">
            <p className="text-gray-300 mb-4">{movie.overview}</p>
            <div className="flex flex-wrap gap-4 mb-6">
              <span>⭐ {movie.vote_average?.toFixed(1)}</span>
              <span>📅 {movie.release_date?.substring(0, 4)}</span>
              <span>🎬 {movie.runtime} min</span>
            </div>
            
            <a
              href={`https://moviesapi.to/movie/${params.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded flex items-center gap-2"
            >
              ▶️ Play Movie
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
