import { Outlet, useLocation } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import styles from './ProductsPage.module.scss';
import { TYPES_NAME_MAP } from '../../config';

export const ProductsPage = () => {
  const { pathname } = useLocation();

  const pathnameParts = pathname.split('/').filter(Boolean);
  const type = pathnameParts[pathnameParts.length - 1];

  return (
    <div className={styles.products_page}>
      <h1 className="visually-hidden">{TYPES_NAME_MAP[type] + ' page'}</h1>

      <Breadcrumbs pathnameParts={pathnameParts} />

      <Outlet />
    </div>
  );
};
