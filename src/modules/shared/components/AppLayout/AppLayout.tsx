import './AppLayout.scss';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => (
  <div>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);
