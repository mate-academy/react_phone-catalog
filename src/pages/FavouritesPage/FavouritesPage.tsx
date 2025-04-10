import { useEffect } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { useAppSelector } from '../../hooks/DispatchSelector';
import { Product } from '../../types/Product';
import s from './FavouritesPage.module.scss';
import { Navigates } from '../../components/Navigate';

export const FavouritesPage = () => {
  const products = useAppSelector(state => state.favourite);
  const productsCount = products.length;

  useEffect(() => {}, []);

  return (
    <>
      <Navigates />
      <h2>Favourites</h2>
      <p className={s.subtitle}>{productsCount} models</p>
      <div className={s.products}>
        {products.length === 0 ? (
          <p>No favourite products found.</p>
        ) : (
          products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </>
  );
};
