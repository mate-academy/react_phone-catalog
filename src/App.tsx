import { Outlet } from 'react-router-dom';
import './App.scss';
import './styles/main.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SideMenu } from './components/SideMenu';
import { useProducts } from './hooks/useProducts';
import { Loader } from './components/Loader';
import { useRef, useState } from 'react';

export const App = () => {
  const { products } = useProducts();
  const headerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      <h1 className="visually-hidden" id="home">
        Product Catalog
      </h1>

      <Header ref={headerRef} onMenu={toggleOpenMenu} />

      <SideMenu isMenuOpen={isMenuOpen} onMenu={toggleOpenMenu} />

      <div className="container">
        {products.length ? <Outlet /> : <Loader />}
      </div>

      <Footer headerRef={headerRef} />
    </div>
  );
};
