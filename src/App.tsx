import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Breadcrumbs } from './components/Breadcrumbs';
import { ErrorNotification } from './components/ErrorNotification';
import { BreadcrumbsProvider } from './context/BreadcrumbsContext';
import { useError } from './context/ErrorContext';
import { LoaderOverlay } from './components/LoaderOverlay';

export const App = () => {
  const { error } = useError();

  return (
    <BreadcrumbsProvider>
      <div className="App">
        <Header />
        {error.message && <ErrorNotification />}
        <main className="page">
          <div className="page__content">
            <Breadcrumbs />
            <Outlet />
          </div>
        </main>
        <Footer />
        <LoaderOverlay />
      </div>
    </BreadcrumbsProvider>
  );
};
