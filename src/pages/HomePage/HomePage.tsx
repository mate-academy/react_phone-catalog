import { useEffect, useState } from 'react';
import { BannerCarousel } from '../../components/BannerCarousel';
// eslint-disable-next-line max-len
import ProductCarousel, {
  Product,
} from '../../components/ProductCarousel/ProductCarousel';

import './HomePage.scss';
import { fetchProducts } from '../../services/api';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(data => {
      const newModels = [...data].filter(
        product => product.year === 2021 || product.year === 2022,
      );

      setProducts(newModels);
    });
  }, []);

  return (
    <>
      <div className="grid">
        <h1 className="item-12 full-width home-title">
          Welcome to Nice <br /> Gadgets store!
        </h1>
        <BannerCarousel />
        <ProductCarousel products={products} title={'Brand new models'} />
      </div>
    </>
  );
};
