import { useEffect, useState } from 'react';
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
import { ProductSlider } from './components/ProductsSlider';
import { Loader } from '../shared/components/UI/Loader';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [accessories, setAccessories] = useState<Accessorie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([getProducts(), getPhones(), getTablets(), getAccessories()])
      .then(([productsData, phonesData, tabletsData, accessoriesData]) => {
        setProducts(productsData);
        setPhones(phonesData);
        setTablets(tabletsData);
        setAccessories(accessoriesData);
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

        <PicturesSlider />

        <ProductList products={products} />

        <ShopByCategory
          phones={phones}
          tablets={tablets}
          accessories={accessories}
        />

        <ProductSlider products={products} title="Hot prices" />
      </div>
    </div>
  );
};
