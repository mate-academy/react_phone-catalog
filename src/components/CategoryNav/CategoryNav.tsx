import { useState, useEffect } from 'react';
import { CategoryNavLink } from './CategoryNavLink';
import { fetchProducts } from '../../api';
import './CategoryNav.scss';

export const CategoryNav = () => {
  const [productAmounts, setProductAmounts] = useState([0, 0, 0]);

  useEffect(() => {
    let phonesAmount = 0;
    let tabletsAmount = 0;
    let accessoriesAmount = 0;

    fetchProducts()
      .then(res => {
        res.forEach(product => {
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
        });

        setProductAmounts([
          phonesAmount,
          tabletsAmount,
          accessoriesAmount,
        ]);
      });
  }, []);

  const [
    phonesAmount,
    tabletsAmount,
    accessoriesAmount,
  ] = productAmounts;

  return (
    <div className="category-nav">
      <h2 className="category-nav__title">
        Shop by category
      </h2>
      <div className="category-nav__links">
        <CategoryNavLink
          path="/phones"
          type="phones"
          text="Phones"
          amount={phonesAmount}
        />
        <CategoryNavLink
          path="/tablets"
          type="tablets"
          text="Tablets"
          amount={tabletsAmount}
        />
        <CategoryNavLink
          path="/accessories"
          type="accessories"
          text="Accessories"
          amount={accessoriesAmount}
        />
      </div>
    </div>
  );
};
