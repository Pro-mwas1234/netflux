// components/MovieCard.tsx
import Link from 'next/link';

export default function MovieCard({ movie }: { movie: any }) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <Link href={`/movie/${movie.id}`}>
      <img
        src={poster}
        alt={movie.title}
        className="imag-lists"
      />
    </Link>
  );
}
