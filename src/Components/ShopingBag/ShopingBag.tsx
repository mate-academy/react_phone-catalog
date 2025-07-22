import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { getLinkClass } from '../Menu/Menu';
import { FC, useContext } from 'react';
import './ShopingBag.scss';
import { ProductsContext } from '../context/ProductsContext';
import { ItemCounter } from '../ItemCounter';

export const ShopingBag: FC<{
  isMobile?: boolean;
  onClose?: () => void;
}> = ({ isMobile, onClose }) => {
  const { cartProducts } = useContext(ProductsContext);

  return (
    <div
      className={classNames('shopping-bag', {
        'shopping-bag--mobile': isMobile,
      })}
    >
      <NavLink
        to="cart"
        className={({ isActive }) =>
          getLinkClass({ isActive, className: 'shopping-bag__link' })
        }
        onClick={onClose}
      >
        <img
          src="./img/icons/ShopingBag.png"
          alt="Shoping Bag"
          className="shoping-bag__img"
        />
      </NavLink>
      {cartProducts.length > 0 && <ItemCounter count={cartProducts.length} />}
    </div>
  );
};
