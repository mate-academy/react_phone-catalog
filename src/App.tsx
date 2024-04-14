import './App.scss';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { ProductState } from './store/storeContext';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

export const App = () => {
  const { hasError, loading } = useContext(ProductState);

  return (
    <div className="App">
      <Header />

      <div className="container">
        {loading && <Loader />}

        {!loading && (hasError ? <ErrorMessage /> : <Outlet />)}
      </div>

      <Footer />
    </div>
  );
};
