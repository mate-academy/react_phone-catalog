import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PageDetails } from '../components/PageDetails/PageDetails';
import { useProducts } from '../context/ProductContext';
import { getAccessories } from '../utils/getProducts';
import { NoResults } from '../components/NoResults/NoResults';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';

export const AccessoriesPage = () => {
  const { pathname } = useLocation();
  const path = pathname.slice(1, 2).toUpperCase() + pathname.slice(2);
  const { products } = useProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const accessories = getAccessories(products);
  const title = 'Accessories';

  return (
    <div className="container">
      <Breadcrumbs pathname={path} />

      {!accessories.length ? (
        <NoResults />
      ) : (
        <PageDetails products={accessories} title={title} />
      )}
    </div>
  );
};
