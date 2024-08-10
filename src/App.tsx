import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './Components/Footer';
import { Header } from './Components/Header';

export const App = () => (
  <div className="App">
    <Header />

    <Outlet />

    <Footer />
  </div>
);
