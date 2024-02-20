import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const App = () => {
  return (
    <div className="app">
      <Header />

      <main className="main app__main">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};
