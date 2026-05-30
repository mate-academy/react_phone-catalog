import classNames from 'classnames';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ProductContext } from '../../store/ProductContext';
import styles from './NavIcons.module.scss';
import { getCountOf } from '../../utils/utils';

export const NavIcons = () => {
  const { addedItems, likedItems } = useContext(ProductContext);
  const likedItemsCount = likedItems.length;
  const addedItemsCount = getCountOf.itemsInCart(addedItems);
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(`${styles.icon} `, {
      'navlink--underline': isActive,
      'link--underline': !isActive,
    });

  return (
    <>
      <NavLink to="/favourites" className={getLinkClass}>
        <div className="icon icon--fav"></div>
        {likedItemsCount > 0 && (
          <div className={styles.icon__count}>{likedItemsCount}</div>
        )}
      </NavLink>
      <NavLink to="/cart" className={getLinkClass}>
        <div className="icon icon--cart"> </div>
        {addedItemsCount > 0 && (
          <div className={styles.icon__count}>{addedItemsCount}</div>
        )}
      </NavLink>
    </>
  );
};
