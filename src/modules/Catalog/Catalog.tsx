import styles from './Catalog.module.scss';
// import '@fontsource/montserrat/400.css';
// import '@fontsource/montserrat/500.css';
// import '@fontsource/montserrat/700.css';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { CatalogInterface } from './interfaces/CatalogInterface';
import { useLocation } from 'react-router-dom';
import { ProductsList } from './components/ProductsList/ProductsList';

export const Catalog: React.FC<CatalogInterface> = () => {
  const path = useLocation().pathname;
  const currentPath = path.slice(1) as CatalogInterface['type'];

  const titles: Record<CatalogInterface['type'], string> = {
    phones: 'Mobile phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  const counts: Record<CatalogInterface['type'], number> = {
    phones: 95,
    tablets: 24,
    accessories: 100,
  };

  return (
    <>
      <div className={styles.catalogPage}>
        <BreadCrumbs category={currentPath} />
        <h2 className={styles.catalogTitle}>{titles[currentPath]}</h2>
        <p className={styles.catalogText}>{counts[currentPath]} models</p>
        <ProductsList type={currentPath} />
      </div>
    </>
  );
};
