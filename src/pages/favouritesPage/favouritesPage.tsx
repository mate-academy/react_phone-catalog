import { Breadcrumbs } from '@ui/breadcrumbs';
import styles from './styles/favouritesPage.module.scss';
import { useFavouritePage } from './model/useFavouritePage';
import { Catalogue } from '@widgets/index';
import { CatalogueData, PerPage } from '@shared/api';
import { UILoadStatus } from '@features/useUILoader';
import { Category } from '@shared/types';

type CatalogueProps = {
  data: CatalogueData | UILoadStatus;
  category: Category | 'favourites';
  currentPerPage: PerPage;
};

const catalogueProps: CatalogueProps = {
  data: UILoadStatus.LOADING,
  category: 'favourites',
  currentPerPage: PerPage.FOUR,
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
