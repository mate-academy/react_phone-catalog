import { NavLink } from 'react-router-dom';
import { ProductContext } from '../../../../../store/ProductContext';
import { useContext } from 'react';
import classNames from 'classnames';
import '../Navigation.scss';

type Props = {
  className: string;
};

export const NavIcons: React.FC<Props> = ({ className }) => {
  const { addedItems, likedItems } = useContext(ProductContext);
  const likedItemsCount = likedItems.length;
  const addedItemsCount = addedItems.length;
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(`${className}__icon nav__icon `, {
      'navlink--underline': isActive,
      'link--underline': !isActive,
    });

  return (
    <>
      <div className={`${className}__icons nav__icons`}>
        <NavLink to="/favourites" className={getLinkClass}>
          <div className="icon icon--fav"></div>
          {likedItemsCount > 0 && (
            <div className={`nav__icon_count`}>{likedItemsCount}</div>
          )}
        </NavLink>
        <NavLink to="/cart" className={getLinkClass}>
          <div className="icon icon--cart">
            {addedItemsCount > 0 && (
              <div className="nav__icon_count">{addedItemsCount}</div>
            )}
          </div>
        </NavLink>
      </div>
    </>
  );
};
