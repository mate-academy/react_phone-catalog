import { Breadcrumbs } from '@ui/breadcrumbs';
import styles from './styles/favouritesPage.module.scss';
import { useFavouritePage } from './model/useFavouritePage';
import { CatalogueGrid } from '@pages/categoriesPage/ui';

export const FavouritesPage = () => {
  const links = [
    {
      name: 'Favourites',
      to: '/favourites',
    },
  ];

  const { renderList, favAmount } = useFavouritePage();

  return (
    <div className={styles['layout-container']}>
      <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
        <Breadcrumbs links={links} />
      </nav>
      <section aria-labelledby="fav-heading" className={styles.catalogue}>
        <h1 id="fav-heading">Favourites</h1>
        <span className={styles.length}>{`${favAmount} items`}</span>

        <CatalogueGrid
          data={
            typeof renderList === 'string'
              ? renderList
              : { items: renderList, currentPage: 1, pages: 1 }
          }
          category="favourites"
        />
      </section>
    </div>
  );
};
