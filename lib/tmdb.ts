const API_KEY = process.env.TMDB_API_KEY;
if (!API_KEY) {
  throw new Error('TMDB_API_KEY is missing in .env.local');
}
// ✅ This must be present and exported
export async function fetchTrendingMovies() {
  const res = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch trending movies');
  }
  return res.json();
}

// Optional: other functions (search, movie details, etc.)
export async function searchMovies(query: string) {
  if (!query.trim()) return { results: [] };
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`
  );
  return res.json();
}
