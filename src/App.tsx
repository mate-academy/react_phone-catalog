import { Outlet } from 'react-router-dom';
import { Header } from './shared/HeaderPage/Header/Header';
import { Footer } from './shared/Footer/Footer';

export const App = () => (
  <div className="App">
    <h1 hidden>Product Catalog</h1>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);
