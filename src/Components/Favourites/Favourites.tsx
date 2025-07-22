import classNames from 'classnames';
import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { getLinkClass } from '../Menu/Menu';
import './Favourites.scss';
import { ItemCounter } from '../ItemCounter';
import { ProductsContext } from '../context/ProductsContext';

export const Favourites: FC<{
  isMobile?: boolean;
  onClose?: () => void;
}> = ({ isMobile, onClose }) => {
  const { favourites } = useContext(ProductsContext);

  return (
    <div
      className={classNames('favourites', {
        'favourites--mobile': isMobile,
      })}
    >
      <NavLink
        to="favourites"
        className={({ isActive }) =>
          getLinkClass({ isActive, className: 'favourites__link' })
        }
        onClick={onClose}
      >
        <img
          src="./img/icons/Favourites.png"
          alt="Favourites items"
          className="favourites__image"
        />
        {favourites.length > 0 && <ItemCounter count={favourites.length} />}
      </NavLink>
    </div>
  );
};
