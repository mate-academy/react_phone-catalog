import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import './App.scss';
import { ContextProviders } from './context/ContextProviders';

export const App = () => {
  return (
    <ContextProviders>
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </ContextProviders>
  );
};
