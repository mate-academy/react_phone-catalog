import { Outlet } from 'react-router-dom';

import { Footer } from './shared/Footer/Footer';
import { Header } from './shared/HeaderPage/Header/Header';

export const App = () => (
  <div className="App">
    <h1 className="is-hidden">Product Catalog</h1>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);
