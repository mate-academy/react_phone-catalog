import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/Header/Header';
import { Footer } from './modules/Footer';

export const App = () => (
  <>
    <Header />
    <main className="main">
      <Outlet />
    </main>
    <Footer />
  </>
);
