import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { getTablets } from '../utils/getProducts';

export const TabletsPage = () => {
  const { pathname } = useLocation();
  const { products } = useProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tablets = getTablets(products);
  const title = 'Tablets';

  return (
    <div className="container">
      <div className="page">
        <Link to="/" className="page__iconContainer">
          <div className="page__iconContainer--icon" />
        </Link>
        <span className="arrow arrow--right-disabled" />
        <span className="page__text">
          {pathname.slice(1, 2).toUpperCase() + pathname.slice(2)}
        </span>
      </div>
      <ProductsList products={tablets} title={title} />
    </div>
  );
};
