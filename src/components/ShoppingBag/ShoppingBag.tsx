import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ShoppingBag.scss';
import { ProductsContext } from '../../helpers/ProductsContext';
import shoppingBag from '../../images/shopping-bag.svg';

export const ShoppingBag: React.FC = () => {
  const { cartItems } = useContext(ProductsContext);
  const numberOfItems = cartItems.length;

  return (
    <Link to="/shoppingBag" className="icon">
      <img src={shoppingBag} alt="shopping bag icon" />

      {!!numberOfItems && (
        <div className="icon__counter">
          {numberOfItems}
        </div>
      )}
    </Link>
  );
};
