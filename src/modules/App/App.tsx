import './App.scss';
import { Header } from '../../components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '../../components/Footer';

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
