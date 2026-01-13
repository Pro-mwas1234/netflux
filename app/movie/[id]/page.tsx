// app/movie/[id]/page.tsx
import Link from 'next/link';

export default async function MoviePage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="min-h-screen bg-[#1f1e1d] text-white p-4 md:p-8">
      <Link href="/" className="back-link">
        &larr; Back to Home
      </Link>
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">M</h1>
        
        
        <div className="test-player">
          <h2 className="text-xl mb-2 text-yellow-400">
          <p className="mb-2 text-gray-300">
           
          </p>
          <iframe
            src={`https://moviesapi.to/movie/${id}`}
            width="100%"
            height="500"
            allowFullScreen
            className="rounded-lg"
            title="Test Player"
          />
        </div>

       
    </div>
  );
}
