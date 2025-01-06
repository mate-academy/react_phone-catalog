import { useState, useEffect } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import './App.scss';
import { Header } from './shared/components/Header';
import { Footer } from './shared/components/Footer';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { PageNotFound } from './modules/PageNotFound';
import { FavouritesPage } from './modules/FavouritesPage';
import { ShoppingBagPage } from './modules/ShoppingBagPage';
import { ProductPage } from './modules/ProductPage';
import { ThreeDots } from 'react-loader-spinner';

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => clearTimeout(timer);
  }, []);

  const routes = useRoutes([
    { path: '/', element: <HomePage /> },
    { path: '/home', element: <Navigate to="/" /> },
    { path: '/phones', element: <PhonesPage /> },
    { path: '/tablets', element: <TabletsPage /> },
    { path: '/accessories', element: <AccessoriesPage /> },
    {
      path: '/:category/:productId',
      element: <ProductPage />,
    },
    { path: '/favourites', element: <FavouritesPage /> },
    { path: '/shopping-bag', element: <ShoppingBagPage /> },
    { path: '*', element: <PageNotFound /> },
  ]);

  return (
    <div className="App">
      {isLoading ? (
        <div className="loader">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#313237"
            radius="9"
            ariaLabel="three-dots-loading"
          />
        </div>
      ) : (
        <>
          <Header setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
          {!isMenuOpen && (
            <>
              <section className="section">
                <div className="container">{routes}</div>
              </section>
              <Footer />
            </>
          )}
        </>
      )}
    </div>
  );
};
