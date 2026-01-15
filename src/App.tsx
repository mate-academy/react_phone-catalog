import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';

export const App = () => (
  <div className="wrapper">
    <Header />
    <main className="main">
      <div className="container">
        <Outlet />
      </div>
    </main>
    <Footer />
  </div>
);
