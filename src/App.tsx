import './App.scss';
import { Header } from './components/shared/Header/Header';
import { Footer } from './components/shared/Footer/Footer';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
