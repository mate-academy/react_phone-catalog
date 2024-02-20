import { useContext, useEffect, useState } from 'react';

import './FavoritePage.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductList } from '../../components/ProductList';
import { MyLoader } from '../../components/UI/MyLoader';

import { Product } from '../../types/product';
import { getPhones } from '../../api/productApi';
import { StateContext } from '../../store/State';

export const FavoritePage = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [favorite, setFavorite] = useState<Product[]>([]);

  const { favoriteProducts } = useContext(StateContext);

  useEffect(() => {
    const data = localStorage.getItem('favoriteProducts');

    if (data) {
      try {
        const favoriteProductsIds = JSON.parse(data) as string[];

        getPhones<Product>()
          .then(res => {
            const onlyFavorite
              = res.filter(el => favoriteProductsIds.includes(el.itemId));

            setFavorite(onlyFavorite);
          })
          .catch(() => setErrorMessage('Samething went wrong....'))
          .finally(() => setLoading(false));
      } catch (err) {
        setLoading(false);
        setErrorMessage('Local storage error..');
        localStorage.removeItem('favoriteProducts');
      }
    }
  }, [favoriteProducts]);

  return (
    <section className="favorite">
      <BreadCrumbs />

      <h1 className="favorite__title">Favourites</h1>
      <p className="favorite__counter">{`${favorite.length} models`}</p>

      {loading
        ? <MyLoader />
        : (
          <>
            {errorMessage
              ? <h2>{errorMessage}</h2>
              : <ProductList products={favorite} />}
          </>
        )}
    </section>
  );
};
