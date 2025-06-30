import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { TopBar } from '../TopBar';
import './MainLayout.scss'


export const MainLayout = () => {
  return (
    <div className="page">
      <TopBar />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
