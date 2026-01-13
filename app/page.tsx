// app/page.tsx
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import { fetchTrendingMovies } from '@/lib/tmdb';

export default async function HomePage() {
  const data = await fetchTrendingMovies();
  const movies = data.results || [];

  return (
    <>
      <Header />
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">Trending Today</h2>
        <div className="flex overflow-x-auto space-x-6 pb-4 hide-scrollbar">
          {movies.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </>
  );
}
