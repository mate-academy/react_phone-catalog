import React, { useEffect, useState } from 'react';
import { getProducts } from '../../helpers/getProducts';
import { Product } from '../../types/Product';
import './CategoryNav.scss';
import { CategoryNavLink } from './CategoryNavLink';

export const CategoryNav: React.FC = () => {
  const [
    productAmounts,
    setProductAmounts,
  ] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  useEffect(() => {
    let phonesAmount = 0;
    let tabletsAmount = 0;
    let accessoriesAmount = 0;

    getProducts()
      .then(data => {
        data.forEach((product: Product) => {
          switch (product.type) {
            case 'phone':
              phonesAmount += 1;
              break;
            case 'tablet':
              tabletsAmount += 1;
              break;
            case 'accessory':
              accessoriesAmount += 1;
              break;
            default:
              break;
          }

          setProductAmounts({
            phones: phonesAmount,
            tablets: tabletsAmount,
            accessories: accessoriesAmount,
          });
        });
      });
  }, []);

  return (
    <div
      className="category-nav"
      data-cy="categoryLinksContainer"
    >
      <CategoryNavLink
        path="/phones"
        type="phones"
        name="Phones"
        models={productAmounts.phones}
      />
      <CategoryNavLink
        path="/tablets"
        type="tablets"
        name="Tablets"
        models={productAmounts.tablets}
      />
      <CategoryNavLink
        path="/accessories"
        type="accessories"
        name="Accessories"
        models={productAmounts.phones}
      />
    </div>
  );
};
