import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const App = () => {
  return (
    <div data-cy="app">
      <Header />

      <div className="container">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
