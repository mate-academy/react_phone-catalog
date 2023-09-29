import {
  FC,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { Slider } from '../../components/Slider/Slider';
import styles from './HomePage.module.scss';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { Product, Products } from '../../types/Product';
import {
  getBrandNewProducts,
  getHotPriceProducts,
  getProducts,
} from '../../api/api';

export const HomePage: FC = () => {
  const [hotPricesProducts, setHotPricesProducts] = useState<Product[]>([]);
  const [brandNewModels, setBrandNewModels] = useState<Product[]>([]);
  const [allProducts, setALLProducts] = useState<Product[]>([]);
  const location = useLocation();

  const getProductsFromServer = async (value: Products) => {
    try {
      let fetchedProducts;

      switch (value) {
        case 'hotPrices':
          fetchedProducts = await getHotPriceProducts();
          setHotPricesProducts(fetchedProducts);
          break;

        case 'brandNew':
          fetchedProducts = await getBrandNewProducts();
          setBrandNewModels(fetchedProducts);
          break;

        default: break;
      }
    } catch (error) {
      (<h1>Error:, error</h1>);
    }
  };

  const getAllProductsFromServer = async () => {
    try {
      setTimeout(async () => {
        const response: Product[] = await getProducts();

        setALLProducts(response);
      }, 1000);
    } catch (error) {
      (<h1>Error:, error</h1>);
    }
  };

  useEffect(() => {
    getAllProductsFromServer();
    getProductsFromServer('hotPrices');
    getProductsFromServer('brandNew');
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const phones = allProducts
    .filter(product => product.category === 'phones');
  const tablets = allProducts
    .filter(product => product.category === 'tablets');
  const accessories = allProducts
    .filter(product => product.category === 'accessories');

  return (
    <section className={styles.home}>
      <Slider />
      <ProductSlider products={hotPricesProducts} title="Hot prices" />
      <ShopByCategory
        phone={phones}
        tablet={tablets}
        accessory={accessories}
      />
      <ProductSlider products={brandNewModels} title="Brand new models" />
    </section>
  );
};
