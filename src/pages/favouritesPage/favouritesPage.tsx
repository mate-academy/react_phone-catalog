import { Breadcrumbs } from '@ui/breadcrumbs';
import styles from './styles/favouritesPage.module.scss';
import { useFavouritePage } from './model/useFavouritePage';
import { ItemsAmount, LoadStatus } from '@shared/api';
import { CatalogueData, Category } from '@shared/api/types';
import { Catalogue } from '@widgets/index';

type CatalogueProps = {
  data: CatalogueData | LoadStatus;
  category: Category | 'favourites';
  currentPerPage: ItemsAmount;
};

const catalogueProps: CatalogueProps = {
  data: LoadStatus.LOADING,
  category: 'favourites',
  currentPerPage: ItemsAmount.FOUR,
};

export const FavouritesPage = () => {
  const links = [
    {
      name: 'Favourites',
      to: '/favourites',
    },
  ];

  const { renderList, favAmount } = useFavouritePage();

  if (typeof renderList !== 'string') {
    catalogueProps.data = { items: renderList, currentPage: 1, pages: 1 };
  }

  return (
    <div className={styles['layout-container']}>
      <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
        <Breadcrumbs links={links} />
      </nav>
      <section aria-labelledby="fav-heading" className={styles.catalogue}>
        <h1 id="fav-heading">Favourites</h1>
        <span className={styles.length}>{`${favAmount} items`}</span>

        <Catalogue {...catalogueProps} />
      </section>
    </div>
  );
};
