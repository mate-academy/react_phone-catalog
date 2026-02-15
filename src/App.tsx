import './App.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

export const App = () => (
  <div className="App">
    <Header />
    <h1 className="App__title">Product Catalog</h1>

    <Outlet />

    <Footer />
  </div>
);
