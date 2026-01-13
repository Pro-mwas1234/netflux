// app/api/search/route.ts
import { searchMovies } from '@/lib/tmdb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  if (!query.trim()) {
    return Response.json({ results: [] });
  }

  try {
    const data = await searchMovies(query);
    return Response.json(data);
  } catch (error) {
    console.error('Search API error:', error);
    return Response.json({ results: [] }, { status: 500 });
  }
}
