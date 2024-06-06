import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/shared/Header';
import { Footer } from './modules/shared/Footer';

export const App = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
