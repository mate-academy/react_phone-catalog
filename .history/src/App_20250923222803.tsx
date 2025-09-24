import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const App = () => (
  <div className="App">
    <div className="HEader"></div>
    <Header />
    <Outlet />
    <Footer />
  </div>
);
