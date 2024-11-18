import { Hero } from './components/Hero';
import styles from './HomePage.module.scss';
import { ShopCategory } from './components/ShopCategory';
import { SuggestionsSlider } from '../../components/SuggestionsSlider';

import { SliderTitle } from '../../types/SliderTitle';
import { getUniqueItems } from '../../utils/getUniqueItems';
import { useEffect, useState } from 'react';
import { getProducts } from '../../utils/getProducts';
import { Product, ProductOtherData } from '../../types/Product';
import { brandNewModels } from '../../utils/brandNewModels';
import { FetchDataType } from '../../types/FetchDataType';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productList, setProductList] = useState<ProductOtherData[]>([]);
  // const [error, setError] = useState('');

  useEffect(() => {
    getProducts(FetchDataType.phones).then(res => setProducts(res));
    // .catch(e => setError(e));

    getProducts(FetchDataType.products).then(res => setProductList(res));
    // .catch(e => setError(e));
  }, []);

  const hotPricesPhones = getUniqueItems(products)
    .filter(phone => !phone.name.includes('iPhone 14'))
    .slice(0, 7);

  const newModels = brandNewModels(products, productList, 'capacity', '256GB');

  return (
    <div className={styles.hero}>
      <Hero />
      <SuggestionsSlider
        productList={newModels}
        title={SliderTitle.newModels}
      />
      <ShopCategory />
      <SuggestionsSlider
        productList={hotPricesPhones}
        title={SliderTitle.hotPrices}
      />
    </div>
  );
};
