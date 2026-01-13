// components/MovieCard.tsx
export default function MovieCard({ 
  movie, 
  type = "movie",
  onClick 
}: { 
  movie: any; 
  type?: string;
  onClick: () => void;
}) {
  return (
    <div 
      className="movie-card"
      onClick={onClick}
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/500x750?text=No+Poster'
        }
        alt={movie.title || movie.name}
      />
      {type === "tv" && (
        <div className="tv-badge">TV</div>
      )}
    </div>
  );
}
