import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Breadcrumbs } from './components/Breadcrumbs';
import { BreadcrumbsProvider } from './context/BreadcrumbsContext';
import { LoaderOverlay } from './components/LoaderOverlay';
import { NotificationCenter } from './components/NotificationCenter/NotificationCenter'; // eslint-disable-line max-len

export const App = () => {
  return (
    <BreadcrumbsProvider>
      <div className="App">
        <Header />
        <main className="page">
          <div className="page__content">
            <NotificationCenter />
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
