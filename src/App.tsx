import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';

export const App = () => {
  return (
    <div className="app">
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
};
