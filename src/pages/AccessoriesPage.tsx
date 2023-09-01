import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { useProducts } from '../context/ProductContext';
import { getAccessories } from '../utils/getProducts';
import { NoResults } from '../components/NoResults/NoResults';

export const AccessoriesPage = () => {
  const { pathname } = useLocation();
  const { products } = useProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const accessories = getAccessories(products);
  const title = 'Accessories';

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

      {accessories.length === 0 ? (
        <NoResults />
      ) : (
        <ProductsList products={accessories} title={title} />
      )}
    </div>
  );
};
