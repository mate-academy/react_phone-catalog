import { useEffect, useState } from 'react';
import { getProduct } from '../api/fetchProducts';
import type { Product } from '../types/products';
import { helperToFindNewProducts } from '../utils/helperToFindNewProducts';
import { helperToFindHotPrice } from '../utils/helperToFindHotPrice';

export const useProductForHomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const phones = products.filter((product) => product.category === 'phones');
  const amountPhones = phones.length;

  const tablets = products.filter((product) => product.category === 'tablets');
  const amountTablets = tablets.length;

  const accessories = products.filter(
    (product) => product.category === 'accessories',
  );
  const amountAccessories = accessories.length;

  const newProducts = helperToFindNewProducts(products);

  const hotPriceProducts = helperToFindHotPrice(products);

  return {
    loading,
    amountPhones,
    amountTablets,
    amountAccessories,
    newProducts,
    hotPriceProducts,
  };
};
