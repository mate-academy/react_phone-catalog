import { Outlet } from 'react-router-dom';
import { Navbar } from '@/shared/components/Navbar';
import './Layout.scss';
import { Footer } from '@/shared/components/Footer/Footer';

export const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
