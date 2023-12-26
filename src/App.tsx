import { Outlet } from 'react-router-dom';
import { useContext } from 'react';

import { AppContext } from './store/AppProvider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import './App.scss';
import { Loader } from './components/Loader';

export const App = () => {
  const { isLoading } = useContext(AppContext);

  return (
    <div className="App page__body">
      <Header />

      {isLoading ? (
        <Loader />
      ) : (
        <Outlet />
      )}

      <Footer />
    </div>
  );
};
