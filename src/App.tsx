import './App.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';

export const App = () => (
  <>
    <NavBar />

    <div className="main-container">
      <Outlet />
    </div>

    <Footer />
  </>
);
