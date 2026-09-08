import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/Header/Header';
import { Footer } from './modules/Footer/Footer';

export const App = () => (
  <div className="app">
    <Header />
    <main className="main">
      <div className="container">
        <Outlet />
      </div>
    </main>
    <Footer />
  </div>
);
