import './App.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from './component/Footer/Footer';
import { Headers } from './component/Header/Header';

export const App = () => {
  return (
    <div className="container">
      <Headers />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
