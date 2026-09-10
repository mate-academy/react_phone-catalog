import './App.scss';
import { Outlet } from 'react-router-dom';
import Navigation from './shared/Navigation/Navigation';
import Footer from './shared/Footer/Footer';

export const App = () => {
  return (
    <div className="app">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
};
