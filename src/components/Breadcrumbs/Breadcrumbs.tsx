import { FunctionComponent } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Styles
import './Breadcrumbs.scss';

// Types
import { Product } from '../../types/Product';

export const Breadcrumbs: FunctionComponent = () => {
  const locationsArr = useLocation().pathname.slice(1).split('/');
  const products = JSON.parse(localStorage.getItem('products') || '[]');

  return (
    <div className="Breadcrumbs">
      <Link to="/" className="Breadcrumbs__link Breadcrumbs__link--home" />

      {locationsArr.map((location, index) => {
        const locationTitle = location[0].toUpperCase() + location.slice(1);

        if (index === locationsArr.length - 1) {
          const selectedProduct = products.find((product: Product) => product.id === location);

          return (
            <span key={location}>
              {selectedProduct ? selectedProduct.name : locationTitle}
            </span>
          );
        }

        return (
          <Link key={location} to={`/${location}`} className="Breadcrumbs__link">
            {locationTitle}
          </Link>
        );
      })}
    </div>
  );
};
