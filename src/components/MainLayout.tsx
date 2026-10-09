import { Outlet } from 'react-router-dom';
import { Header } from './Shared/Header/Header';
import { Footer } from './Shared/Footer/Footer';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
