import { useEffect, useState } from 'react';
import { BannerCarousel } from '../../components/BannerCarousel';
// eslint-disable-next-line max-len
import {
  ProductCarousel,
  Product,
} from '../../components/ProductCarousel/ProductCarousel';

import './HomePage.scss';
import { fetchProducts } from '../../services/api';
import { Categories } from '../../components/Categories';

export const HomePage = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [tabletLength, setTabletLength] = useState(0);
  const [phoneLength, setPhoneLength] = useState(0);
  const [accessoriesLength, setAccessoriesLength] = useState(0);

  useEffect(() => {
    fetchProducts().then(data => {
      const newModels = [...data].filter(
        product => product.year === 2021 || product.year === 2022,
      );

      const hotModels = [...data].filter(
        product => product.year === 2019 || product.year === 2020,
      );

      const tabletsLength = [...data].filter(product => {
        return product.category === 'tablets';
      }).length;

      setTabletLength(tabletsLength);

      const phonesLength = [...data].filter(product => {
        return product.category === 'phones';
      }).length;

      setPhoneLength(phonesLength);

      const accessoriesCount = [...data].filter(product => {
        return product.category === 'accessories';
      }).length;

      setAccessoriesLength(accessoriesCount);

      setNewProducts(newModels);
      setHotProducts(hotModels);
    });
  }, []);

  return (
    <>
      <div className="grid">
        <h1 className="item-12 full-width home-title">Product Catalog</h1>
        <BannerCarousel />
        <ProductCarousel
          products={newProducts}
          title={'Brand new models'}
          discount={false}
        />

        <Categories
          tabletLength={tabletLength}
          phoneLength={phoneLength}
          accessoriesLength={accessoriesLength}
        />

        <ProductCarousel
          products={hotProducts}
          title={'Hot prices'}
          discount={true}
        />
      </div>
    </>
  );
};
