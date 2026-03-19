import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useScrollToTop } from '../hooks/useScrollToTop';

export const MainLayout = () => {
  useScrollToTop();

  return (
    <>
      <Header />

      <main className="mainContent">
        <div className="pageContainer">
          <Outlet />
        </div>
      </main>

      <Footer />
    </>
  );
};
