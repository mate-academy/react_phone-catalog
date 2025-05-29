import './App.scss';
import './styles/fonts.scss';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';

export const App = () => (
  <div className="app">
    <NavBar />

    <div className="main">
      <div className="container">
        <Outlet />
      </div>
    </div>

    <Footer />
  </div>
);
