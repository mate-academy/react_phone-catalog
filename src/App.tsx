/* eslint-disable react-hooks/exhaustive-deps */
import './App.scss';
import '../public/fonts/Font-faces.scss';
import { AnimatedRoutes } from './routes';
import { Header } from './modules/Header';
import { Footer } from './modules/Footer';
import { Menu } from './modules/Menu';
import { useContext } from 'react';
import { Breadcrumbs } from './modules/Breadcrumb';
import { useLocation } from 'react-router-dom';
import { MainContext } from './context/MainContext';
import { PageLoader } from './modules/PageLoader';

export const App = () => {
  const { isMobile, isLoading } = useContext(MainContext);
  const { pathname } = useLocation();
  const showBreadcrumbs = pathname !== '/' && pathname !== '/home';

  return (
    <div className="App">
      <h1 className="hidden-title">Product Catalog</h1>
      <Header />
      {isMobile && <Menu />} {/* should be second */}
      {isLoading && <PageLoader />}
      {showBreadcrumbs && <Breadcrumbs />}
      <AnimatedRoutes />
      <Footer />
    </div>
  );
};
