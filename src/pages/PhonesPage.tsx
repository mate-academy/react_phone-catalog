import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductsList } from '../components/ProductsList/ProductsList';

export const PhonesPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="page">
        <Link to="/" className="page__iconContainer">
          <div className="page__iconContainer--icon" />
        </Link>
        <span className="arrow arrow--right-disabled" />
        {pathname.slice(1)}
      </div>
      <ProductsList />
    </div>
  );
};
