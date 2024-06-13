import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer/Footer';

export const App = () => {
  return (
    <>
      <Navigation />
      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};
