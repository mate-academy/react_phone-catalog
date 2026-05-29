import { useEffect, useState } from 'react';
import { Footer } from '../shared/components/Layout/Footer';
import { Header } from '../shared/components/Layout/Header';
import { ProductList } from '../shared/components/ProductsList';
import { Product } from '../../types/product';
import {
  getAccessories,
  getPhones,
  getProducts,
  getTablets,
} from '../../services/product.api';
import styles from './HomePage.module.scss';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { Phone } from '../../types/phone';
import { Tablet } from '../../types/tablet';
import { Accessorie } from '../../types/accessorie';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [accessories, setAccessories] = useState<Accessorie[]>([]);

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(() => {});
    getPhones()
      .then(data => setPhones(data))
      .catch(() => {});
    getTablets()
      .then(data => setTablets(data))
      .catch(() => {});
    getAccessories()
      .then(data => setAccessories(data))
      .catch(() => {});
  }, []);

  return (
    <div className={styles.homePage}>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
        <PicturesSlider />
        <ProductList products={products} />
        <ShopByCategory
          phones={phones}
          tablets={tablets}
          accessories={accessories}
        />
      </div>
      <Footer />
    </div>
  );
};
