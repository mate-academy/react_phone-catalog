import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { useLoader } from './context/LoaderContext';
import { useFooter } from './context/FooterContext';

export const App: React.FC = () => {
  const { isLoading } = useLoader();
  const { isShow } = useFooter();

  return (
    <div className="App">
      <Header />
      <div className="content">
        <Outlet />
      </div>
      {isLoading || isShow && <Footer />}
    </div>
  );
};
