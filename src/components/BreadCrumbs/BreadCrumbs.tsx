import { Link, useLocation, useParams } from 'react-router-dom';
import React, { useMemo } from 'react';
import './BreadCrumbs.scss';
import { Product } from '../../types/Product';
import { useProducts } from '../../contexts/Products';

interface Props {
  products?: Product[];
}

export const BreadCrumbs: React.FC<Props> = ({ products }) => {
  const location = useLocation();
  const { productId } = useParams();
  const { phones, tablets, accessories } = useProducts();

  const breadCrumbs = useMemo(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);

    if (pathParts.length === 0) {
      return [];
    }

    let currentProduct: Product | undefined;

    if (productId) {
      currentProduct =
        phones.items.find(p => p.id.toString() === productId) ||
        tablets.items.find(p => p.id.toString() === productId) ||
        accessories.items.find(p => p.id.toString() === productId);

      return [currentProduct?.category, currentProduct?.name];
    }

    return [pathParts[0]];
  }, [location, productId, products]);

  return (
    <div className="bread-crumbs">
      <Link to="/" className="bread-crumbs__home">
        <img src="./img/home.png" alt="go-home" className="bread-crumbs__home__link" />
      </Link>
      <div className="bread-crumbs__next">
        <img src="./img/right.png" alt="next" className="bread-crumbs__next__link" />
      </div>
      {breadCrumbs.map((item, i) => {
        const isLast = i === breadCrumbs.length - 1;

        return (
          <div className="bread-crumbs__item" key={i}>
            {isLast ? (
              <span className="bread-crumbs__item__link">{item}</span>
            ) : (
              <Link to={`/${breadCrumbs[i]}`} className="bread-crumbs__item__link--active">
                {item}
              </Link>
            )}

            {i < breadCrumbs.length - 1 && (
              <div className="bread-crumbs__next">
                <img src="./img/right.png" alt="next" className="bread-crumbs__next__link" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
