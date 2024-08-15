import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import './App.scss';

export const App = () => (
  <div className="App">
    <Header />
    <Menu />
    <Outlet />
    <Footer />
  </div>
);
