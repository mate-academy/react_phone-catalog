import { Outlet } from 'react-router-dom';
import { useContext } from 'react';

import { AppContext } from './store/AppProvider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Loader } from './components/Loader';

import './styles/utils/main.scss';
import './App.scss';

export const App = () => {
  const { isLoading } = useContext(AppContext);

  return (
    <div className="App App__container page__body">
      <div className="App__top">
        <Header />

        {isLoading ? (
          <Loader />
        ) : (
          <Outlet />
        )}
      </div>

      <Footer />
    </div>
  );
};
