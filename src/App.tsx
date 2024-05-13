import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu/MobileMenu';

export const App = () => (
  <div className="App">
    <Header />
    <MobileMenu />
    <Outlet />
  </div>
);
