import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const App = () => (
  <div className="app">
    <Header />

    <main className="app__main">
      <Outlet />
    </main>

    <Footer />
  </div>
);
