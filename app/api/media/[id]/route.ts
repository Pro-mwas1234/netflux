// app/api/media/[id]/route.ts
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US&append_to_response=videos,credits`
    );
    
    if (!res.ok) throw new Error('Failed to fetch media');
    const data = await res.json();
    
    return Response.json(data);
  } catch (error) {
    console.error('Media API error:', error);
    return Response.json({ error: 'Failed to load media' }, { status: 500 });
  }
}
