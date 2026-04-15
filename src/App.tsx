import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <Header />
      <Footer />

      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
