import { useAppSelector } from '../../hooks/hooks';
import { BreadCrumbs } from '../../modules/BreadCrumbs/BreadCrumbs';
import { Container } from '../../modules/Container';
import { Products } from '../../modules/ProductsList/Products';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const favoritesProducts = useAppSelector(state => state.favorites);

  return (
    <section className="FavoritesPage">
      <BreadCrumbs title="Favorites" />

      <Container>
        <div className={styles.Favorites__top}>
          <p
            className={styles.favoritesLength}
          >{`${favoritesProducts.length} ${favoritesProducts.length === 1 ? 'item' : 'items'}`}</p>
        </div>
        <Products data={favoritesProducts} />
      </Container>
    </section>
  );
};
