// app/page.tsx
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import { fetchTrendingMovies, fetchTrendingSeries } from '@/lib/tmdb';

interface Media {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  number_of_seasons?: number;
}

export default async function HomePage() {
  const [moviesData, seriesData] = await Promise.all([
    fetchTrendingMovies(),
    fetchTrendingSeries()
  ]);
  
  const movies: Media[] = moviesData.results || [];
  const series: Media[] = seriesData.results || [];
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
      
      <section className="movie-section">
        <h2 className="section-title">Trending Movies</h2>
        <div className="movie-grid">
          {movies.slice(1, 30).map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              type="movie" 
            />
          ))}
        </div>
      </section>

      <section className="movie-section">
        <h2 className="section-title">Trending Series</h2>
        <div className="movie-grid">
          {series.slice(0, 30).map((show) => (
            <MovieCard 
              key={show.id} 
              movie={show} 
              type="tv" 
            />
          ))}
        </div>
      </section>
    </div>
  );
}
