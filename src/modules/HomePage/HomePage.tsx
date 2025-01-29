import { useEffect, useMemo } from 'react';

import './HomePage.scss';

import { ProductsSlider } from '@components/ProductsSlider';

import { Categories } from './components/Categories';

import { loadProducts } from '@features/productsSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector(state => state.products);

  // fetching data
  useEffect(() => {
    if (
      products.phones.length &&
      products.tablets.length &&
      products.accessories.length
    ) {
      return;
    }

    if (isLoading) {
      return;
    }

    dispatch(loadProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allProducts = useMemo(() => {
    return Object.values(products).flat(Infinity);
  }, [products]);

  const brandNewProducts = useMemo(() => {
    return [...allProducts]
      .sort((productA, productB) => productA.age - productB.age)
      .slice(0, 20);
  }, [allProducts]);

  const hotPricesProducts = useMemo(() => {
    return [...allProducts]
      .sort((productA, productB) => {
        const discountA = productA.fullPrice - productA.price;
        const discountB = productB.fullPrice - productB.price;

        return discountB - discountA;
      })
      .slice(0, 20);
  }, [allProducts]);

  return (
    <div className="home-page">
      <h1>Welcome to Nice Gadgets store!</h1>

      <ProductsSlider
        title={'Brand new models'}
        products={brandNewProducts}
        hidePrevPrice
      />

      <Categories />

      <ProductsSlider title={'Hot Prices'} products={hotPricesProducts} />
    </div>
  );
};
