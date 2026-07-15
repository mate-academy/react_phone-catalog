import classNames from 'classnames';
import styles from './FavoritesPage.module.scss';
import { BreadcrumbLink } from '../shared/components/Breadcrumbs/types';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductList } from '../shared/components/ProductList';
import { useFavorites } from '../shared/store/FavoritesContext';

const links: BreadcrumbLink[] = [
  {
    label: 'Favorites',
  },
];

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  const count = favorites.length;

  return (
    <div className={classNames(styles['favorites-page'], 'container')}>
      <Breadcrumbs links={links} />

      <div className={styles['favorites-page__header']}>
        <h1 className={styles['favorites-page__title']}>Favorites</h1>
        <span className={styles['favorites-page__count']}>
          {count !== 1 ? `${count} models` : `${count} model`}
        </span>
      </div>

      <ProductList products={favorites} />
    </div>
  );
};
