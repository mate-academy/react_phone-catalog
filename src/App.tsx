import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App = () => (
  <div className="app">
    <header className="app__header">
      <Header />
    </header>

    <main className="app__main">
      <div className="app__container">
        <Outlet />
      </div>
    </main>

    <footer className="app__footer">
      <Footer />
    </footer>
  </div>
);
