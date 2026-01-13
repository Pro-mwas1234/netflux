// lib/tmdb.ts
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

if (!API_KEY) {
  throw new Error('TMDB_API_KEY is missing in environment variables');
}

export async function fetchTrendingMovies() {
  const res = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch trending movies');
  return res.json();
}

export async function fetchTrendingSeries() {
  const res = await fetch(
    `${BASE_URL}/trending/tv/day?api_key=${API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch trending series');
  return res.json();
}

export async function fetchMovieById(id: string) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits`
  );
  if (!res.ok) throw new Error('Failed to fetch media details');
  return res.json();
}

export async function searchMovies(query: string) {
  if (!query.trim()) return { results: [] };
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false&language=en-US`
  );
  if (!res.ok) throw new Error('Failed to search movies');
  return res.json();
}
