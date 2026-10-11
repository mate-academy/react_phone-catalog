import styles from './FavoritesPage.module.scss';
import { IconTrail } from '../../components/IconTrail/IconTrail';
import { useFavorites } from '../../hooks';
import { PhoneDetails, ProductDetails, TabletDetails } from '../../types';
import { useEffect, useState } from 'react';
import { getPhones } from '../../api/phones';
import { getAccessories } from '../../api/accessories';
import { getTablets } from '../../api/tablets';
import { CatalogCard } from '../../components/CatalogCard';

import { ProductCardSkeleton } from '../../components/Loaders';

export const FavoritesPage = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { favoriteIds } = useFavorites();

  const [phones, setPhones] = useState<PhoneDetails[]>([]);
  const [tablets, setTablets] = useState<TabletDetails[]>([]);
  const [accessories, setAccessories] = useState<ProductDetails[]>([]);

  const allProducts = [...phones, ...tablets, ...accessories];

  const filteredFavProducts = allProducts.filter(product => {
    return favoriteIds.includes(product.id);
  });

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
    Promise.all([getPhones(), getTablets(), getAccessories()])
      .then(([phone, tablet, accessorie]) => {
        setPhones(phone);
        setTablets(tablet);
        setAccessories(accessorie);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  return (
    <section className={styles.favorites}>
      <IconTrail name="Favorites" choseProduct={null} />
      <section className={styles.favorites__title}>
        <h1>Favorites</h1>
      </section>
      <section className={styles.favorites__amount}>
        <p>{favoriteIds.length} itens</p>
      </section>
      <div className={styles.favorites__products}>
        {hasError && <p>Error loading favorites</p>}

        {isLoading &&
          Array.from({ length: favoriteIds.length }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}

        {!isLoading &&
          !hasError &&
          filteredFavProducts.map(product => (
            <CatalogCard showFullPrice key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
};
