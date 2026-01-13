// app/movie/[id]/page.tsx
import Link from 'next/link';

export default async function MoviePage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="min-h-screen bg-[#1f1e1d] text-white p-4 md:p-8">
      <Link href="/" className="text-red-500 mb-6 inline-block">
        &larr; Back to Home
      </Link>
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Movie ID: {id}</h1>
        
        <iframe
          src={`https://moviesapi.to/movie/${id}`}
          width="100%"
          height="600"
          allowFullScreen
          className="rounded-lg"
          title="Movie Player"
        />
      </div>
    </div>
  );
}
