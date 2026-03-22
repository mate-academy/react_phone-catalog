import { Outlet } from 'react-router-dom';
import { AppProviders } from '@/context/AppProvider';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import './styles/App.scss';
import './i18n';

export const App = () => {
  return (
    <AppProviders>
      <div className="app">
        <Header />
        <main className="app__main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AppProviders>
  );
};
