import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useContext } from 'react';
import { ProductsContext } from './store/ProductsContext';
import Loader from './components/Loader/Loader';

export const App = () => {
  const { isLoading } = useContext(ProductsContext);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <main className="main">
        <Outlet />;
      </main>
      <Footer />
    </>
  );
};
