import { useAppSelector } from '../../hooks/hooks';
import { BreadCrumbs } from '../../modules/BreadCrumbs/BreadCrumbs';
import { Container } from '../../modules/Container';
import { Products } from '../../modules/ProductsList/Products';
import styles from './FavoritesPage.module.scss';
import notFound from './../../images/placeholders/product-not-found.png';

export const FavoritesPage = () => {
  const favoritesProducts = useAppSelector(state => state.favorites);

  return (
    <section className="FavoritesPage">
      {favoritesProducts.length ? (
        <Container>
          <BreadCrumbs title="Favorites" />
          <div className={styles.Favorites__top}>
            <p
              className={styles.favoritesLength}
            >{`${favoritesProducts.length} ${favoritesProducts.length === 1 ? 'item' : 'items'}`}</p>
          </div>
          <Products data={favoritesProducts} />
        </Container>
      ) : (
        <Container>
          <h2>There are no favorites items</h2>
          <div className={styles.notFound}>
            <img
              src={notFound}
              className={styles.notFound__img}
              alt="Not found favorites"
            />
          </div>
        </Container>
      )}
    </section>
  );
};
