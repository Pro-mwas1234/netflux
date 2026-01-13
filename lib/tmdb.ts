// lib/tmdb.ts
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL;

if (!API_KEY || !BASE_URL) {
  throw new Error('TMDB environment variables are missing');
}

export async function fetchTrendingMovies() {
  const res = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } } // Revalidate every hour
  );
  if (!res.ok) throw new Error('Failed to fetch trending movies');
  return res.json();
}

export async function fetchMovieById(id: string) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits`
  );
  if (!res.ok) throw new Error('Failed to fetch movie details');
  return res.json();
}
