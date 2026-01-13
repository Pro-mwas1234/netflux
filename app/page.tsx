// app/page.tsx
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import { fetchTrendingMovies } from '@/lib/tmdb';

export default async function HomePage() {
  const data = await fetchTrendingMovies();
  const movies = data.results || [];
  const hero = movies[0];

  return (
    <div>
      {/* Hero Banner */}
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

      {/* Main Content */}
      <Header />
      
      {/* Trending Movies Section */}
      <section className="movie-section">
        <h2 className="section-title">Trending Now</h2>
        <div className="movie-grid">
          {movies.slice(1, 30).map((movie: any) => ( // Show 29 movies
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Add more sections if needed */}
      {/* 
      <section className="movie-section">
        <h2 className="section-title">Top Rated</h2>
        <div className="movie-grid">
          {topRatedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
      */}
    </div>
  );
}
