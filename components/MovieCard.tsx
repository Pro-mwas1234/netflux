import Link from 'next/link';

export default function MovieCard({ movie }: { movie: any }) {
  return (
    <Link href={`/movie/${movie.id}`} className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
    </Link>
  );
}
