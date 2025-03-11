import './App.scss';
import { Phones } from './components/modules/Phones/Phones';
import { Header } from './components/shared/Header/Header';
import { Footer } from './components/shared/Footer/Footer';
import { Cart } from './components/modules/Cart/Cart';
import { Slider } from './components/shared/Slider/Slider';
import { useAppDispatch } from './app/hooks';
import { useEffect } from 'react';
import { loadProducts } from './features/ProductsSlice/ProductsSlice';

export const App = () => {
  return (
    <>
      <Header />
      <main className="container">
        {/* <Phones />
      <Cart /> */}
        {<Slider />}
      </main>
      <Footer />
    </>
  );
};
