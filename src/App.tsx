import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import { Header } from './components/header/Header';
import { Footer } from './components/footer';
import { BreadCrumbs } from './components/breadcrumbs';

export const App = () => {
  const location = useLocation();
  const isHomePage =
    location.pathname === '/' || location.pathname === '/basket';

  return (
    <div className="page">
      <Header />
      <main className="page__container container">
        {!isHomePage && <BreadCrumbs />}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
