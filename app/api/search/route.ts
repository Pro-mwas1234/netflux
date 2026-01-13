// app/api/search/route.ts
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  
  if (!query.trim()) {
    return Response.json({ results: [] });
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`
    );
    
    if (!res.ok) throw new Error('TMDB search failed');
    const data = await res.json();
    
    return Response.json(data);
  } catch (error) {
    console.error('Search error:', error);
    return Response.json({ results: [] }, { status: 500 });
  }
}
