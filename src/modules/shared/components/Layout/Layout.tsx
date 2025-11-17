import { Outlet } from 'react-router-dom';
import { Navbar } from '@/modules/shared/components/Navbar';
import './Layout.scss';
import { Footer } from '../Footer';

export const Layout = () => {
  return (
    <>
      <header className="header">
        <Navbar />
      </header>
      <main className="container">
        <Outlet /> {/* <- this renders the current route's element */}
      </main>
      <Footer />
    </>
  );
};
