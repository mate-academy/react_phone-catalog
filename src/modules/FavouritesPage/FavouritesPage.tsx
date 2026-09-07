/* eslint no-console: [,{ allow: ["warn", "log", "error"] }] */
import { FC, useEffect, useState } from 'react';
import s from './FavouritesPage.module.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { useFavouriteContext } from '../../context/FavoritesContext';
import { Product } from '../../types/Product';
import { getProductsByIds } from '../../api/products';
import { ProductList } from '../CategoryPage/components/ProductList';
import { Loader } from '../shared/components/Loader';
import { ErrorNotice } from '../shared/components/ErrorNotice';

export const FavouritesPage: FC = () => {
  const { ids, count } = useFavouriteContext();
  const [favouriteProducts, setFavouriteProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const breadcrumbs = [{ link: null, label: 'Favourites' }];

  useEffect(() => {
    const fetchFavourites = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const products = await getProductsByIds(ids);

        setFavouriteProducts(products);
      } catch (error) {
        console.error(error);
        setErrorMessage('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavourites();
  }, [ids]);

  return (
    <main>
      <section className={s.container}>
        <Breadcrumbs paths={breadcrumbs} />
        <h1>Favourites</h1>
        {count ? (
          <div className={s.count}>{count} items</div>
        ) : (
          <div className={s.text}>There are no favourite products yet.</div>
        )}
        {isLoading && <Loader />}
        {errorMessage && (
          <ErrorNotice
            message={errorMessage}
            onReload={() => window.location.reload()}
          />
        )}
        {!isLoading && !errorMessage && (
          <ProductList products={favouriteProducts} />
        )}
      </section>
    </main>
  );
};
