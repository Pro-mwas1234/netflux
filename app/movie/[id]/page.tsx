// app/movie/[id]/page.tsx
import Link from 'next/link';
import { fetchMovieById } from '@/lib/tmdb';

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await fetchMovieById(params.id);

  return (
    <div className="movie-detail">
      <Link href="/" className="back-link">&larr; Back to Home</Link>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Released: {movie.release_date}</p>
    </div>
  );
}
