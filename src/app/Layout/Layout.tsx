import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Header } from '../../shared/components/Header';
import { Footer } from '../../shared/components/Footer';
import s from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={s.root}>
      <Header />
      <main className={s.content}>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration getKey={location => location.pathname} />
    </div>
  );
};
