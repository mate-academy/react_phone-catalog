import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/Header';
import { Footer } from './modules/Footer';

export const App = () => {
  return (
    <div className="">
      <Header />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
