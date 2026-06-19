import { useEffect, useMemo, useState } from 'react';
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

  const newestProducts = useMemo(() => {
    return [...products].sort(
      (newProduct, oldProduct) =>
        (oldProduct.year ?? 0) - (newProduct.year ?? 0),
    );
  }, [products]);

  const hotPricesProducts = useMemo(() => {
    return [...products].sort((hightPrice, lessPrice) => {
      const discountA = (hightPrice.fullPrice ?? 0) - (hightPrice.price ?? 0);
      const discountB = (lessPrice.fullPrice ?? 0) - (lessPrice.price ?? 0);

      return discountB - discountA;
    });
  }, [products]);

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
        <h1 className={styles.hiddenTitle}>Product Catalog</h1>
        <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

        <PicturesSlider />

        <ProductSlider products={newestProducts} title="Brand new models" />

        <ShopByCategory
          phones={phones}
          tablets={tablets}
          accessories={accessories}
          title="Shop by category"
        />

        <ProductSlider products={hotPricesProducts} title="Hot prices" />
      </div>
    </div>
  );
};
