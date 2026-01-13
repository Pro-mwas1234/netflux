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
        <div className="barners">
          <img
            src={`https://image.tmdb.org/t/p/original${hero.backdrop_path}`}
            alt={hero.title}
            className="barner-image"
          />
          <div className="movie-details">
            <div>
              <h1 className="movie-name">{hero.title}</h1>
              <p className="movie-description">{hero.overview}</p>
              <div className="action-btns">
                <button id="watch">▶️ Play</button>
                <button className="Morein">ℹ️ More Info</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
        <Header />
        <section className="list">
          {movies.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </section>
      </main>
    </div>
  );
}
