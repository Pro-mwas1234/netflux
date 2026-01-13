// components/Header.tsx
export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-red-600 text-4xl font-bold">NETFLUX</h1>
      <div className="flex space-x-4">
        <span>Home</span>
        <span className="text-gray-400">Series</span>
        <span className="text-gray-400">Films</span>
        <span className="text-gray-400">New & Popular</span>
      </div>
    </div>
  );
}
