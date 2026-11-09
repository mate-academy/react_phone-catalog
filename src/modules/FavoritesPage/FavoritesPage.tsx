import { WithLoader } from '../../components/WithLoader';
import styles from './FavoritesPage.module.scss';
import { useFavorites } from '../../shared/context/FavoritesContext';
import { Card } from '../../modules/Card/Card';
import layoutStyles from '../../components/Layout/Layout.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <section className={styles.favoritesPage}>
      <div className={layoutStyles.container}>
        <h1>Favourites</h1>
        <p className={styles.counter}>{favorites.length} items</p>

        <WithLoader loading={false} error={null}>
          {favorites.length === 0 ? (
            <p>No favourites yet</p>
          ) : (
            <div className={layoutStyles['layout--grid']}>
              {favorites.map(product => (
                <Card
                  key={product.id}
                  product={product}
                  variant="grid"
                  showPrices
                  showSpecs
                  showActions
                  showDiscount
                />
              ))}
            </div>
          )}
        </WithLoader>
      </div>
    </section>
  );
};
