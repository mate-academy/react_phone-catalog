/* eslint-disable max-len */
/* eslint-disable no-console */
import { useContext } from 'react';
import { CategoriesContext } from '../../components/CategoriesContext/CategoriesContext';
import { useLocation } from 'react-router-dom';

export const CatalogPage = () => {
  const { pathname } = useLocation();

  console.log(pathname.slice(1));

  const categories = useContext(CategoriesContext);

  console.log(categories);
  const pageTitle =
    categories.find(
      category => category.name.toLowerCase() === pathname.slice(1),
    )?.longName || 'Catalog';

  return (
    <div className="container">
      <h1 className="title">{pageTitle}</h1>
    </div>
  );
};
