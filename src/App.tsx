import './App.scss';
import { Phones } from './components/modules/Phones/Phones';
import { Header } from './components/shared/Header/Header';
import { Footer } from './components/shared/Footer/Footer';
import { Cart } from './components/modules/Cart/Cart';
import { Slider } from './components/shared/Slider/Slider';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { loadProducts } from './features/ProductsSlice/ProductsSlice';

export const App = () => {
  const dispatch = useAppDispatch();
  const hotPrices = useAppSelector(state => state.products.products)
      .filter(product => product.price)
      .slice(0, 20);

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return (
    <>
      <Header />
      <main className="container">
        {/* <Phones />
      <Cart /> */}
        {hotPrices.length > 0 && <Slider products={hotPrices} />}
      </main>
      <Footer />
    </>
  );
};
