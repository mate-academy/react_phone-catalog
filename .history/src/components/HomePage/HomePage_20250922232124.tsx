import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ProductsContext } from '../../ProductsProvider';

export const HomePage: React.FC = () => {
  const { phones, tablets, accessories } = useContext(ProductsContext);

  return (
    <div>
      <h1 hidden>Product Catalog</h1>
      <h2>Shop by category</h2>
      <ul>
        <li>
          <NavLink to="/phones">Phones ({phones.length})</NavLink>
        </li>
        <li>
          <NavLink to="/tablets">Tablets ({tablets.length})</NavLink>
        </li>
        <li>
          <NavLink to="/accessories">
            Accessories ({accessories.length})
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
