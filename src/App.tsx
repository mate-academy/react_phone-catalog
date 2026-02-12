import { matchPath, Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import { Header } from './layouts/Header';
import { BurgerMenu } from './layouts/BurgerMenu';
import { Breadcrumbs } from './components/Breadcrumbs';
import { RoutePath } from './types/RoutePath';
import { Footer } from './layouts/Footer';

const BREADCRUMB_ROUTES = [
  RoutePath.Phones,
  RoutePath.Phone,
  RoutePath.Tablets,
  RoutePath.Tablet,
  RoutePath.Accessories,
  RoutePath.Accessory,
  RoutePath.Favorites,
];

export const App = () => {
  const location = useLocation();

  const showBreadcrumbs = BREADCRUMB_ROUTES.some(route =>
    matchPath(route, location.pathname),
  );

  return (
    <>
      <Header />
      <BurgerMenu />
      <main className="page__main container">
        {showBreadcrumbs && <Breadcrumbs />}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
