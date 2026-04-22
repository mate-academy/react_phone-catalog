import { Outlet } from 'react-router-dom';
import { Header } from '../Header';

export const Layout = () => (
  <div className="app">
    <Header />

    <main className="main" data-cy="main-content">
      <Outlet />
    </main>

    <footer className="footer" data-cy="footer">
      {/* Footer content will go here */}
    </footer>
  </div>
);
