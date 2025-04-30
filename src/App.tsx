import { Outlet } from 'react-router-dom';
import { Header } from './modules/shared/Header/Header';
import { Footer } from './modules/shared/Footer/Footer';

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
