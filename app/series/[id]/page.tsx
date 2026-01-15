// app/series/[id]/page.tsx
import Link from 'next/link';
import { fetchMovieById } from '@/lib/tmdb';

// ✅ Required for dynamic routes on Vercel
export async function generateStaticParams() {
  return []; // Allows all paths
}

export default async function SeriesPage({ params }: { params: { id: string } }) {
  const series = await fetchMovieById(params.id);

  return (
    <div className="min-h-screen bg-[#1f1e1d] text-white p-4 md:p-8">
      <Link href="/" className="back-link">
        &larr; Back to Home
      </Link>
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{series.name || series.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <img
              src={
                series.poster_path
                  ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
                  : 'https://via.placeholder.com/500x750?text=No+Poster'
              }
              alt={series.name}
              className="rounded-lg w-full"
            />
          </div>
          <div className="md:col-span-3">
            <p className="text-gray-300 mb-4">{series.overview}</p>
            <div className="flex flex-wrap gap-4 mb-6">
              <span>⭐ {series.vote_average?.toFixed(1)}</span>
              <span>📅 {series.first_air_date?.substring(0, 4)}</span>
              <span>📺 {series.number_of_seasons} Seasons</span>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="font-bold mb-2">Seasons</h3>
              <div className="flex flex-wrap gap-2">
                {[...Array(series.number_of_seasons || 1)].map((_, i) => (
                  <a
                    key={i + 1}
                    href={`https://moviesapi.to/tv/${params.id}/season/${i + 1}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm inline-block"
                  >
                    Season {i + 1}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
