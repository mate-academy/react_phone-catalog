import { Outlet } from 'react-router-dom';
import { Header } from './modules/shared/Header';
import './styles/App.scss';
import { Footer } from './modules/shared/Footer';

export const App = () => (
  <div className="app">
    <Header />

    <Outlet />

    <Footer />
    <h1 hidden>Product Catalog</h1>
  </div>
);
