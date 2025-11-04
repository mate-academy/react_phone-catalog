import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useTabs } from './ProductsContext/TabsContext';
import { Loader } from './modules/shared/components/Loader';
import { Helmet } from 'react-helmet';

export const App = () => {
  const { loading } = useTabs();

  return (
    <>
      <Helmet>
        <link rel="icon" type="icon/svg+xml" href="img/Logo.png" />
        <title>Nice Gadgets store</title>
      </Helmet>

      <div data-cy="app">
        <Header />

        {loading ? (
          <Loader />
        ) : (
          <div className="container">
            <Outlet />
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};
