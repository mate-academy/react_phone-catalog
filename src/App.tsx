import './App.scss';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div className="grid-container">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
