import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { useState } from 'react';
import { ProductProvider } from './shared/Context/ProductContext';
import { ActionProvider } from './shared/Context/ActionContext';
import { Footer } from './components/Footer/Footer';

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app">
      <ProductProvider>
        <ActionProvider>
          <Header setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
          <Outlet />
          <Footer />
        </ActionProvider>
      </ProductProvider>
    </div>
  );
};
