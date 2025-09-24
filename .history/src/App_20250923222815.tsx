import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const App = () => (
  <div className="App">
    <div className="Header">
      <Header />
    </div>
    <Outlet />
    <Footer />
  </div>
);
