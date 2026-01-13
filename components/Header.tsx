export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-netflix-red text-3xl font-bold">NETFLIX</h1>
        <nav className="hidden md:flex space-x-6">
          <span className="font-semibold">Home</span>
          <span className="text-gray-400">TV Shows</span>
          <span className="text-gray-400">Movies</span>
          <span className="text-gray-400">New & Popular</span>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white">🔍</button>
          <div className="w-8 h-8 rounded bg-gray-600"></div>
        </div>
      </div>
    </header>
  );
}
