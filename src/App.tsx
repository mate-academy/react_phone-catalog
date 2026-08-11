import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

export const App = () => (
  <div className="app">
    <Header />
    <main className="app__main">
      <Outlet />
    </main>
    <Footer />
  </div>
);
