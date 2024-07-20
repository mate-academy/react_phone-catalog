import { useEffect, useState } from 'react';
import { getProducts } from '../../utils/api';
import { Product } from '../../types/Product';
import styles from './HomePage.module.scss';
import { PicturesSlider } from '../../components/PicturesSlider/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Categories } from '../../components/Categories/Categories';

const NEW_MODEL = 'iPhone 14';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsFromApi = await getProducts('/products.json');

        setProducts(productsFromApi);
      } catch (error) {
        // console.log('error', error);
      }
    };

    fetchProducts();
  }, []);

  const newModels = products
    .filter(product => product.name.includes(NEW_MODEL))
    .sort((a, b) => b.fullPrice - a.fullPrice);

  const hotPricesModels = products.sort((a, b) => b.price - a.price);

  return (
    <div className={styles.homePage}>
      <h1>Welcome to Nice Gadgets store!</h1>
      <PicturesSlider />
      <ProductsSlider
        products={newModels}
        type={'brandNew'}
        title={'Brand new models'}
      />
      <Categories />
      <ProductsSlider
        products={hotPricesModels}
        type={'hotPrices'}
        title={'Hot prices'}
      />
    </div>
  );
};
