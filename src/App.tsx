import { Outlet } from 'react-router-dom';

import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { StoreProvider } from './contexts/StoreContext';

export const App = () => {
  return (
    <div className="App">
      <StoreProvider>
        <Header />

        <main className="App__page page">
          <div className="page__container">
            <Outlet />
          </div>
        </main>
      </StoreProvider>

      <Footer />
    </div>
  );
};
