import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';

export const App = () => (
  <div className="App">
    <NavBar />
    <Outlet />
    <Footer />
  </div>
);
