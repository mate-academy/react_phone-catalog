import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './shared/Footer';
import { Header } from './shared/Header';

export const App = () => {
  return (
    <div className="App">
      <header>
        <Header />
      </header>

      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};
