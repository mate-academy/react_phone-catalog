import { Outlet } from 'react-router-dom';
import './App.scss';

import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';

export const App = () => (
  <div className="App">
    <div className="container">
      <header className="header">
        <Header />
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer footer__container">
        <Footer />
      </footer>
    </div>
  </div>
);
