/* eslint-disable */
import { useAppSelector } from '../../app/hooks';
import { ProductCart } from '../../components/cardItem/ProductCart';
import { Container } from '../../components/container/Container';
import { PageNav } from '../../components/pageNav/PageNav';
import { ProductNotFound } from '../../components/productNotFound/ProductNotFound';
import { TitlePages } from '../../components/title/TitlePages';
import styles from './FavouritePage.module.scss';

export const FavouritePage = () => {
  const favouriteItems = useAppSelector(
    state => state.favourite.favouriteItems,
  );

  return (
    <Container>
      <PageNav />
      <TitlePages type={'favourites'} />
      {favouriteItems.length === 0 && <ProductNotFound type={'favourites'} />}
      <div className={styles.favourite__list}>
        <ProductCart types={'grid'} products={favouriteItems} />
      </div>
    </Container>
  );
};
