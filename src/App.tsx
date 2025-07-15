import { useEffect, useState } from 'react';
import './App.scss';
import { NavBar } from './components/NavBar';
import { PicturesSlider } from './components/PicturesSlider';
import { Products } from './types/Products';
import { ProductsSlider } from './components/ProductsSlider';
import { ShopCategory } from './components/ShopCategory';
import { Phones } from './types/Phones';
import { Tablets } from './types/Tablets';
import { Accessories } from './types/Accessories';
import { HotPriceSlider } from './components/HotPriceSlider';
import { Footer } from './components/Footer';

export const App = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [phones, setPhones] = useState<Phones[]>([]);
  const [tablets, setTablets] = useState<Tablets[]>([]);
  const [accessories, setAccessories] = useState<Accessories[]>([]);

  useEffect(() => {
    fetch('api/products.json')
      .then(res => res.json())
      .then(setProducts)
      .catch(() => {})
      .finally(() => {});
  }, []);

  useEffect(() => {
    fetch('api/phones.json')
      .then(res => res.json())
      .then(setPhones)
      .catch(() => {})
      .finally(() => {});
  }, []);

  useEffect(() => {
    fetch('api/tablets.json')
      .then(res => res.json())
      .then(setTablets)
      .catch(() => {})
      .finally(() => {});
  }, []);

  useEffect(() => {
    fetch('api/accessories.json')
      .then(res => res.json())
      .then(setAccessories)
      .catch(() => {})
      .finally(() => {});
  }, []);

  return (
    <div className="App">
      <NavBar />

      <main>
        <PicturesSlider />
        <ProductsSlider product={products} />
        <ShopCategory
          countPhones={phones.length}
          countTablets={tablets.length}
          countAccessories={accessories.length}
        />
        <HotPriceSlider product={products} />
      </main>

      <Footer />
    </div>
  );
};
