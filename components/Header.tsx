// components/Header.tsx
import SearchDropdown from './SearchDropdown';

export default function Header() {
  return (
    <header className="topbar">
      <div className="logo">NETFLUX</div>
      <div className="flex items-center gap-4">
        <SearchDropdown />
        <div>👤</div>
      </div>
    </header>
  );
}
