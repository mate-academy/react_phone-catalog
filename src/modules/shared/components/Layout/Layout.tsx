import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';

export const Layout = () => (
  <div className="app">
    <Header />

    <main className="main" data-cy="main-content">
      <Outlet />
    </main>

    <Footer />
  </div>
);
