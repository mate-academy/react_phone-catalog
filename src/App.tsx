import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer/Footer';

export const App = () => {
  return (
    <div className="app">
      <Header />

      <main className="mainContainer">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
