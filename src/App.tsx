import './App.scss';
import WelcomeSlider from './components/WelcomeSlider';
import Categories from './components/Categories';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { Products } from './types/types';
import SliderCarts from './components/SliderCarts';

export const App = () => {
  const [products, setProducts] = useState<Products[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./api/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);

  return (
    <div className="App">
      <WelcomeSlider />
      <SliderCarts
        products={products}
        title="Brand new models"
        loading={loading}
      />
      <Categories />
      <SliderCarts
        products={products}
        title="Hot prices"
        loading={loading}
        isHotPrices={true}
      />
      <Footer />
    </div>
  );
};
