import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { PageDetails } from '../components/PageDetails/PageDetails';
import { getTablets } from '../utils/getProducts';
import { NoResults } from '../components/NoResults/NoResults';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';

export const TabletsPage = () => {
  const { pathname } = useLocation();
  const path = pathname.slice(1, 2).toUpperCase() + pathname.slice(2);
  const { products } = useProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tablets = getTablets(products);
  const title = 'Tablets';

  return (
    <div className="container">
      <Breadcrumbs pathname={path} />

      {!tablets.length ? (
        <NoResults />
      ) : (
        <PageDetails products={tablets} title={title} />
      )}
    </div>
  );
};
