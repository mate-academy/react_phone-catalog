import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PageDetails } from '../components/PageDetails/PageDetails';
import { useProducts } from '../context/ProductContext';
import { getPhones } from '../utils/getProducts';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { NoResults } from '../components/NoResults/NoResults';

export const PhonesPage = () => {
  const { pathname } = useLocation();
  const path = pathname.slice(1, 2).toUpperCase() + pathname.slice(2);
  const { products } = useProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const phones = getPhones(products);
  const title = 'Mobile phones';

  return (
    <div className="container">
      <Breadcrumbs pathname={path} />
      {!phones.length ? (
        <NoResults />
      ) : (
        <PageDetails products={phones} title={title} />
      )}
    </div>
  );
};
