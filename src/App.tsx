import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

import './utils/i18n';
import './App.scss';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <>
      <Navbar />

      <main className="page__main">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </>
  );
};
