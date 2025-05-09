import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Breadcrumbs } from './components/Breadcrumbs';
import { ErrorNotification } from './components/ErrorNotification';
import { BreadcrumbsProvider } from './context/BreadcrumbsContext';
import { LoaderOverlay } from './components/LoaderOverlay';

export const App = () => {
  return (
    <BreadcrumbsProvider>
      <div className="App">
        <Header />
        <ErrorNotification />
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
