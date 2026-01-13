import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import { fetchTrendingMovies } from '@/lib/tmdb';

export default async function HomePage() {
  const data = await fetchTrendingMovies();
  const movies = data.results || [];
  const hero = movies[0];

  return (
    <div className="relative min-h-screen">
      {/* Hero Banner */}
      {hero && (
        <div className="relative h-[80vh]">
          <img
            src={`https://image.tmdb.org/t/p/original${hero.backdrop_path}`}
            alt={hero.title}
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          <div className="absolute bottom-0 left-0 p-12 w-full max-w-3xl z-10">
            <h1 className="text-5xl font-bold mb-4">{hero.title}</h1>
            <p className="text-gray-300 text-lg line-clamp-3">{hero.overview}</p>
            <button className="mt-6 bg-netflix-red hover:bg-red-700 text-white px-8 py-3 rounded font-medium flex items-center">
              ▶️ Play
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="p-8 -mt-40 relative z-10 pt-24">
        <Header />
        
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
          <div className="hide-scrollbar flex space-x-6 overflow-x-auto pb-4 -mx-2 px-2">
            {movies.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
