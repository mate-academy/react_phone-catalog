import { useAppSelector } from '../../app/hook';
import { CatalogHeader } from '../../components/CatalogHeader';
import { ProductsList } from '../../components/ProductsList';
import { ErrorNoProductsFav } from '../../components/Errors';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const { favourites } = useAppSelector(state => state.favourites);

  return (
    <div className={styles.content}>
      <CatalogHeader category="Favourites" products={favourites} />

      {!favourites.length && <ErrorNoProductsFav />}

      {!!favourites.length && (
        <ProductsList products={favourites} showPagination={false} />
      )}
    </div>
  );
};
