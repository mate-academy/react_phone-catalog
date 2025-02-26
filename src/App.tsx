/* eslint-disable react-hooks/exhaustive-deps */
import './App.scss';
import '../public/fonts/Font-faces.scss';
import { AnimatedRoutes } from './routes';
import { Header } from './modules/Header';
import { Footer } from './modules/Footer';
import { Menu } from './modules/Menu';
import { useContext, useEffect } from 'react';
import { Breadcrumbs } from './modules/Breadcrumb';
import { useLocation } from 'react-router-dom';
import { MainContext } from './context/MainContext';
import { PageLoader } from './modules/PageLoader';
import { ErrorQueries } from './enums/ErrorsQueries';
import { Error } from './modules/Error';

export const App = () => {
  const { isMobile, isLoading, isError, isEmptiness } = useContext(MainContext);
  const { pathname } = useLocation();
  const showBreadcrumbs = pathname !== '/' && pathname !== '/home';

  useEffect(() => {
    document.body.style.overflowY = isEmptiness ? 'hidden' : 'auto';
  }, [isEmptiness]);

  return (
    <div className="App">
      <h1 className="hidden-title">Product Catalog</h1>
      <Header />
      {isMobile && <Menu />} {/* should be second */}
      {isLoading && <PageLoader />}
      {isError === ErrorQueries.loading ? (
        <Error query={isError} />
      ) : (
        <>
          {showBreadcrumbs && <Breadcrumbs />}
          {!isError && <AnimatedRoutes />}
          <Footer />
        </>
      )}
    </div>
  );
};
