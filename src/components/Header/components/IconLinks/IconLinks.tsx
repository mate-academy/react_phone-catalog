import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../../../../store/ProductContext';
import cn from 'classnames';
import styles from './IconLinks.module.scss';

type Props = {
  mainClass: string[];
  linkClass: string[];
  iconClass: string[];
};

export const IconLinks: React.FC<Props> = ({
  mainClass,
  linkClass,
  iconClass,
}) => {
  const { cart, favs } = useContext(ProductContext);
  const cartCount = cart.length;
  const favsCount = favs.length;

  const getLinkClass = (isActive: boolean) =>
    cn(
      linkClass.map(c => styles[c]),
      { [styles[`${linkClass[0]}--active`]]: isActive },
    );

  return (
    <div
      className={cn(
        styles.iconLinks,
        mainClass.map(c => styles[c]),
      )}
    >
      <NavLink to="/cart" className={({ isActive }) => getLinkClass(isActive)}>
        <span
          style={{ '--count': `"${cartCount || ''}"` } as React.CSSProperties}
          className={cn(iconClass.map(c => styles[c]))}
        >
          <img
            src={
              cart.length
                ? 'img/icons/cart-counter.svg'
                : 'img/icons/cart-empty.svg'
            }
            alt="Cart"
          />
        </span>
      </NavLink>

      <NavLink
        to="/favourites"
        className={({ isActive }) => getLinkClass(isActive)}
      >
        <span
          style={{ '--count': `"${favsCount || ''}"` } as React.CSSProperties}
          className={cn(iconClass.map(c => styles[c]))}
        >
          <img
            src={
              favs.length ? 'img/icons/favs-counter.svg' : 'img/icons/favs.svg'
            }
            alt="Favourites"
          />
        </span>
      </NavLink>
    </div>
  );
};
