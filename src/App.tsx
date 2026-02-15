import { useContext } from 'react';
import './App.scss';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Outlet } from 'react-router-dom';
import { ProductContext } from './context/ProductContext';

export const App = () => {
  const { openMenu } = useContext(ProductContext);

  return (
    <div className="grid-container">
      <Header />
      {!openMenu && (
        <>
          <main className="main">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};
