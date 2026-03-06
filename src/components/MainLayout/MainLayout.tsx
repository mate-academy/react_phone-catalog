import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer/Footer';
import s from './MainLayout.module.scss';

export const MainLayout = () => {
  return (
    <div className={s.mainLayout}>
      <Header />

      <main className={s.main}>
        <div className={s.container}>
          <Outlet />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
