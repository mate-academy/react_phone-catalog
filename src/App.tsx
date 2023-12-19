import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

export const App = () => {
  return (
    <>
      <header>
        <Header />
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <Footer />
      </footer>

    </>
  );
};
