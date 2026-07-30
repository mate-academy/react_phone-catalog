import './HomePage.scss';

import { useEffect, useState } from 'react';
import * as service from '../../api/products';

import { HotPricesList } from '../../components/HotPricesList';
import { CategoryList } from '../../components/CategoryList';
import { NewModelsList } from '../../components/NewModelsList';
import { BannerSlider } from '../../components/Slider';

import { Product } from '../../types/Product';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    service
      .getProducts()
      .then(setProducts)
      .catch(error => setErrorMessage(`Unable to load products ${error}`));
  }, []);

  return (
    <div className="home">
      <h1 className="home__main-title">Product Catalog</h1>
      <h2 className="home__title">Welcome to Nice Gadgets store!</h2>
      <BannerSlider />
      <NewModelsList products={products} errorMessage={errorMessage} />
      <CategoryList products={products} errorMessage={errorMessage} />
      <HotPricesList products={products} errorMessage={errorMessage} />
    </div>
  );
};
