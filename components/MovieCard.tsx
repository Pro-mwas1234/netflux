import Link from 'next/link';

export default function MovieCard({ movie }: { movie: any }) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <Link href={`/movie/${movie.id}`} className="w-44 flex-shrink-0 block">
      <img
        src={poster}
        alt={movie.title}
        width={176}
        height={264}
        className="rounded-lg shadow-md hover:shadow-xl transition-shadow"
        loading="lazy"
      />
      <h3 className="mt-2 text-white text-sm font-medium truncate">{movie.title}</h3>
      <p className="text-gray-400 text-xs">{movie.release_date?.substring(0, 4)}</p>
    </Link>
  );
}
