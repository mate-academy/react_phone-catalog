import './App.scss';
import { NavBar } from './component/NavBar';
import { Outlet } from 'react-router-dom';
import { Footer } from './component/Footer';

export const App = () => {
  return (
    <div className="wrapper">
      <NavBar />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
