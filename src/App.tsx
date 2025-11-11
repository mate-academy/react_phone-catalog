import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useTabs } from './ProductsContext/TabsContext';
import { Loader } from './modules/shared/components/Loader';
import { Helmet } from 'react-helmet';
import { useScrollToTop } from './modules/shared/navigate/useScrollToTop';

export const App = () => {
  const { loading } = useTabs();

  useScrollToTop();

  return (
    <>
      <Helmet>
        <link
          rel="icon"
          type="icon/svg+xml"
          href="../public/img/image/Favicon.png"
        />
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
