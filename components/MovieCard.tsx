import Link from 'next/link';

export default function MovieCard({ movie }: { movie: any }) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <Link href={`/movie/${movie.id}`} className="w-48 flex-shrink-0 block group">
      <div className="relative">
        <img
          src={poster}
          alt={movie.title}
          className="rounded-lg w-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
          <div className="bg-white text-black rounded-full p-2">
            ▶️
          </div>
        </div>
      </div>
      <h3 className="mt-2 text-white text-sm font-medium truncate">{movie.title}</h3>
    </Link>
  );
}
