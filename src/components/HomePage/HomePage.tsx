import './HomePage.scss';
import { Banner } from './Banner/Banner';
import { HotPrices } from './HotPrices';
import { NewModels } from './NewModels';
import { ShopByCategory } from './ShopByCategory';
import { useEffect, useState } from 'react';
import { Product } from '../../types/products';
import { getProducts } from '../../units/api';
import {
  getBiggestSaleProduct,
  getProductsPhones,
} from '../../units/functions';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <>
      <h1 className="title">Welcome to Nice Gadgets store!</h1>

      <Banner />

      <NewModels phones={getProductsPhones(products)} />

      <ShopByCategory />

      <HotPrices salesProducts={getBiggestSaleProduct(products)} />
    </>
  );
};
