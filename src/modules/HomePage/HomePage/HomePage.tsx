import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store/store';
import { fetchProducts } from '../../../app/reducers/products';
import { Banner } from '../Banner/Banner';
import { Categories } from '../Categories/Categories';
import { NewModels } from '../NewModels/NewModels';
import { HotPrices } from '../HotPrices/HotPrices';

export const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items: allProducts, status } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    if (status === 'start') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const newModels = useMemo(() => {
    return allProducts.filter(product =>
      product.name.toLowerCase().includes('iphone 14'),
    );
  }, [allProducts]);

  const hotPrices = useMemo(() => {
    return [...allProducts].sort(
      (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
    );
  }, [allProducts]);

  return (
    <section className="container">
      <h1 className="visually-hidden">Product Catalog</h1>
      <Banner />
      <NewModels products={newModels} />
      <Categories />
      <HotPrices products={hotPrices} />
    </section>
  );
};
