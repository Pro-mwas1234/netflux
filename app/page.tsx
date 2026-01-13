import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import { fetchTrendingMovies } from '@/lib/tmdb';

export default async function HomePage() {
  const data = await fetchTrendingMovies();
  const movies = data.results || [];
  const hero = movies[0];

  return (
    <div>
      {hero && (
        <div className="hero">
          <img
            src={`https://image.tmdb.org/t/p/original${hero.backdrop_path}`}
            alt={hero.title}
          />
          <div className="hero-content">
            <h1>{hero.title}</h1>
            <button className="play-btn">▶️ Play</button>
          </div>
        </div>
      )}

      <Header />
      <div className="movie-grid">
        {movies.slice(1, 13).map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
