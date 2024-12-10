/* eslint-disable react/react-in-jsx-scope */
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div className="app">
      <div className="app__container">
        <div className="app__header">
          <Header />
        </div>
        <div className="app__main">
          <Outlet />
        </div>
        <div className="app__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};
