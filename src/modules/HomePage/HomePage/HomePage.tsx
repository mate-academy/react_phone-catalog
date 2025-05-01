import { Banner } from '../Banner/Banner';
import styles from './HomePage.module.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect } from 'react';
import { fetchProducts } from '../../../app/reducers/product';
import { NewModels } from '../NewModels/NewModels';
import { Categories } from '../Categories';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const newProducts = products.filter(product =>
    product.name.includes('iPhone 14'),
  );

  return (
    <section className="container">
      <Banner />
      <NewModels products={newProducts} />
      <Categories products={products} />
    </section>
  );
};
