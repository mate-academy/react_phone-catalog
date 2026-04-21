import { Outlet } from 'react-router-dom';

export const Layout = () => (
  <div className="app">
    <header className="header">{/* Nav, logo, icons will go here */}</header>

    <main className="main">
      <Outlet />
    </main>

    <footer className="footer">{/* Footer content will go here */}</footer>
  </div>
);
