import styles from './Catalog.module.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { CatalogInterface } from './interfaces/CatalogInterface';
// import { useLocation } from 'react-router-dom';
import { ProductsList } from './components/ProductsList/ProductsList';

export const Catalog: React.FC<CatalogInterface> = ({ type }) => {
  // const path = useLocation().pathname;
  // const location = useLocation();
  // const currentPath = location.hash.replace(
  //   /^#\//,
  //   '',
  // ) as CatalogInterface['type'];

  const titles: Record<CatalogInterface['type'], string> = {
    phones: 'Mobile phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  const title = titles[type] || 'Catalog';

  // const counts: Record<CatalogInterface['type'], number> = {
  //   phones: 95,
  //   tablets: 24,
  //   accessories: 100,
  // };

  return (
    <>
      <div className={styles.catalogPage}>
        <div className={styles.breadCrumbsWrapper}>
          <BreadCrumbs category={type} />
        </div>
        <h2 className={styles.catalogTitle}>{title}</h2>
        <ProductsList type={type} />
      </div>
    </>
  );
};
