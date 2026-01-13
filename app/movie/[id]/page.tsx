// app/movie/[id]/page.tsx
import Link from 'next/link';

export default async function MoviePage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="min-h-screen bg-[#1f1e1d] text-white p-4">
      <Link href="/" className="text-red-500 mb-6 inline-block">
        &larr; Back to Home
      </Link>

      <h1 className="text-2xl font-bold mb-4">Movie ID: {id}</h1>

      {/* ⚠️ TEMPORARY TEST ONLY — DO NOT DEPLOY */}
      <div className="mt-6 border border-red-500 p-2">
        <p className="text-yellow-300 mb-2">⚠️ Test Player (Will Likely Fail)</p>
        <iframe
          src={`https://moviesapi.to/movie/${id}`}
          width="100%"
          height="500"
          allowFullScreen
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
