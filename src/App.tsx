import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.scss';
import { Outlet } from 'react-router-dom';

export const App = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);
