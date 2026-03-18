import { Outlet } from 'react-router-dom';
import { AppProviders } from '@/context/AppProvider';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
// eslint-disable-next-line max-len
import './styles/App.scss';

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
