// components/MovieCard.tsx
import Link from 'next/link';

export default function MovieCard({ movie }: { movie: any }) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <Link href={`/movie/${movie.id}`} className="movie-card w-48 flex-shrink-0">
      <img
        src={poster}
        alt={movie.title}
        className="rounded-lg w-full"
      />
      <div className="overlay rounded-lg">
        <div className="play-button bg-white text-black rounded-full p-3">
          ▶️
        </div>
      </div>
      <h3 className="mt-2 text-white text-sm font-medium truncate">{movie.title}</h3>
    </Link>
  );
}
