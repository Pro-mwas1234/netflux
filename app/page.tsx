// app/movie/[id]/page.tsx
import { fetchMovieById } from '@/lib/tmdb';
import { fetchTrendingMovies } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';

// Define minimal type for generateStaticParams
interface Movie {
  id: number;
}

export async function generateStaticParams() {
  const data = await fetchTrendingMovies();
  const movies: Movie[] = data.results || [];

  return movies.slice(0, 10).map((movie) => ({
    id: movie.id.toString(),
  }));
}

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
      <div className="relative h-96 md:h-[500px]">
        <Image
          src={backdrop}
          alt={movie.title}
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 -mt-24 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            className="rounded-lg shadow-2xl"
          />
          <div className="text-white">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-gray-300 mt-2">
              {movie.release_date} • {movie.runtime} min
            </p>
            <p className="mt-4 text-lg">{movie.overview}</p>
            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-medium mt-4"
              >
                ▶️ Watch Trailer
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12">
        <Link href="/" className="text-red-500 hover:underline">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
