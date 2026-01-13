// components/Header.tsx
export default function Header() {
  return (
    <header className="topbar">
      <div className="my-logo">NETFLIX</div>
      <div className="right-stuffs">
        <div>🔍</div>
        <img
          src="/user-placeholder.png"
          alt="User"
          className="userimge"
        />
      </div>
    </header>
  );
}
