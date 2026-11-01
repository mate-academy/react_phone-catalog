import { Header } from './components/Header';
import { Footer } from './components/Footer';

import main from './App.module.scss';
import { Outlet } from 'react-router-dom';

export const App = () => (
  <div className={main.app}>
    <Header />

    <main className={main.main}>
      <Outlet />
    </main>

    <Footer />
  </div>
);
