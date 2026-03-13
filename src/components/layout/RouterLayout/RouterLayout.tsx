import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
// import { Footer } from './Footer/Footer';

export const RouterLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};
