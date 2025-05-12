import { Outlet } from 'react-router-dom';

import { Header } from './modules/shared/Header';
import { BurgerMenu } from './modules/shared/BurgerMenu';
import { Footer } from './modules/shared/Footer';
import './App.scss';

export const App = () => (
  <div className="App">
    <h1 hidden>Product Catalog</h1>

    <Header />

    <BurgerMenu />

    <main>
      <Outlet />
    </main>

    <Footer />
  </div>
);
