import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';

export const App = () => {
  return (
    <div className="app" id="app">
      <Header />
      <div className="app__outlet">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
