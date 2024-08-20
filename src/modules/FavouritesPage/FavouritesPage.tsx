import { useContext, useEffect, useState } from 'react';
import styles from './FavouritesPage.module.scss';
import { AppContext } from '../../utils/AppContext';
// eslint-disable-next-line max-len
import { ProductsTitleBlock } from '../../shared/components/ProductsTitleBlock/ProductsTitleBlock';
// eslint-disable-next-line max-len
import { ProductsTable } from '../../shared/components/ProductsTable/ProductsTable';
import { DataTypes, getData } from '../../utils/ApiClient';
import { Product } from '../../types/Product';
import { Loader } from '../../shared/components/Loader/Loader';

export const FavouritePage = () => {
  const { favorites, isDarkTheme } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getData(DataTypes.products)
      .then(items =>
        setFavoriteProducts(
          items.filter((item: Product) => favorites.includes(item.itemId)),
        ),
      )
      .finally(() => setIsLoading(false));
  }, [favorites]);

  return (
    <main className={isDarkTheme ? styles.mainDark : ''}>
      <section className={styles.favourites}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ProductsTitleBlock
              category="Favourites"
              title="Favourites"
              quantity={favorites.length}
            />
            <ProductsTable products={favoriteProducts} />
          </>
        )}
      </section>
    </main>
  );
};
