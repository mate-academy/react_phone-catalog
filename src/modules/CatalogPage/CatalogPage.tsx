/* eslint-disable max-len */
/* eslint-disable no-console */
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CategoriesContext } from '../../Context/CategoriesContext';
import { ProductsContext } from '../../Context/ProductsContext';

export const CatalogPage = () => {
  const { pathname } = useLocation();
  const categories = useContext(CategoriesContext);
  const products = useContext(ProductsContext);

  console.log(products);
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
