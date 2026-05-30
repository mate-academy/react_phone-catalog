import { Breadcrumbs } from '../../../shared/components/Breadcrumbs'
import { FavouritesHeader } from '../FavoritesHeader'

import styles from './FavouritesContent.module.scss';
import { ProductList } from '../../../shared/components/ProductList';
import { useAppSelector } from '../../../../app/store/hooks';
import { EmptyFavourites } from '../EmptyFavourites';

export const FavouritesContent = () => {
  const favourites = useAppSelector(state => state.favourites.items);
  return (
    <>
      <Breadcrumbs pageName='favourites'/>
      <FavouritesHeader />
      <div className={styles.content}>
        {favourites.length > 0 ? <ProductList products={favourites}/> : <EmptyFavourites />}
      </div>
    </>
  );
};
