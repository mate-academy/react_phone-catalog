import { useContext } from 'react';

import './App.scss';
import { Outlet } from 'react-router-dom';
import { StateStore } from './store/StoreContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Loader } from './components/Loader/Loader';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

export const App = () => {
  const { isError, isLoading } = useContext(StateStore);

  return (
    <div className="App">
      <Header />

      <div className="container">
        {isLoading && <Loader />}

        {!isLoading && (isError ? <ErrorMessage /> : <Outlet />)}
      </div>

      <Footer />
    </div>
  );
};
