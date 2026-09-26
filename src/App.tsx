import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="app__content">
        <Outlet />
      </div>

      <div className="app__footer">
        <Footer />
      </div>
    </div>
  );
};
