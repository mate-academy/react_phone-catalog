import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.scss';

export const App = () => (
  <div className="App">
    <Header />

    <div className="container">
      <Outlet />
    </div>

    <Footer />
  </div>
);
