// lib/tmdb.ts
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

if (!API_KEY) {
  throw new Error('TMDB_API_KEY is missing in environment variables');
}

// Fetch trending movies for homepage
export async function fetchTrendingMovies() {
  const res = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } } // Revalidate every hour
  );
  
  if (!res.ok) {
    throw new Error('Failed to fetch trending movies');
  }
  
  return res.json();
}

// Fetch movie details by ID
export async function fetchMovieById(id: string) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits`
  );
  
  if (!res.ok) {
    throw new Error('Failed to fetch movie details');
  }
  
  return res.json();
}

// Search movies by query
export async function searchMovies(query: string) {
  if (!query.trim()) {
    return { results: [] };
  }
  
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false&language=en-US`
  );
  
  if (!res.ok) {
    throw new Error('Failed to search movies');
  }
  
  return res.json();
}

// Optional: Fetch watch providers (where to stream legally)
export async function fetchWatchProviders(movieId: string) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`
  );
  
  if (!res.ok) {
    throw new Error('Failed to fetch watch providers');
  }
  
  return res.json();
}
