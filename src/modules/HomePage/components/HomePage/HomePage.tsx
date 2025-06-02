import { useCallback, useEffect, useState } from 'react';
import { getProduct } from '../../../shared/utils/fetchClient';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import { Slider } from '../Slider';
import { Product } from '../../../shared/utils/types/apiTypes';
import { ShopByCategory } from '../ShopByCategory';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[] | undefined>();

  const loadProducts = useCallback(() => {
    getProduct('/products.json').then(data => setProducts(data));
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const biggestDiscount = products
    ?.sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 6);

  return (
    <div>
      <h1>Welcome to Nice Gadgets store!</h1>
      <Slider />
      <ProductSlider products={biggestDiscount} header={'Brand new models'} />
      <ShopByCategory />
    </div>
  );
};
