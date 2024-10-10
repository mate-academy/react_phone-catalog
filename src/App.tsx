import './App.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header/Header';

import './i18n';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <h1 className="App__title">Product Catalog</h1>

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
