import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
// import { PageContext } from '../../context/PageContext';
import { useContext, useMemo } from 'react';
import { CartContext } from '../../context/CartContext';
import { FavouritesContext } from '../../context/FavouritesContext';
import { IsActiveMenuContext } from '../../context/IsActiveMenuContext';

const buttons = [
  { id: 1, name: 'favourites' },
  { id: 2, name: 'cart' },
  { id: 3, name: 'menu' },
];

function isActiveLink({ isActive }: { isActive: boolean }) {
  return classNames('nav__item uppercase', { 'nav__item--selected': isActive });
}

function isActiveButtonLink(prop: { isActive: boolean }, buttonName: string) {
  return classNames(`header__button header__button-${buttonName}`, {
    'header__button--active': prop.isActive,
  });
}

export const HeaderButtons = () => {
  const { cart } = useContext(CartContext);
  const { favourites } = useContext(FavouritesContext);
  const { setIsActiveMenu } = useContext(IsActiveMenuContext);

  const totalCartCount = useMemo(() => {
    let count = 0;

    cart.forEach(item => {
      count += item.count;
    });

    return count;
  }, [cart]);

  return (
    <Fragment>
      <nav className="header__nav nav">
        <NavLink to="/" className={isActiveLink}>
          Home
        </NavLink>
        <NavLink to="/phones" className={isActiveLink}>
          Phones
        </NavLink>
        <NavLink to="/tablets" className={isActiveLink}>
          Tablets
        </NavLink>
        <NavLink to="/accessories" className={isActiveLink}>
          Accessories
        </NavLink>
      </nav>
      <div className="header__buttons">
        {buttons.map(button => (
          <Fragment key={button.id}>
            {button.name === 'menu' ? (
              <div
                className={classNames(
                  `header__button header__button-${button.name}`,
                )}
                onClick={() => {
                  if (button.name === 'menu') {
                    setIsActiveMenu(true);
                  }
                }}
              ></div>
            ) : (
              <NavLink
                to={`/${button.name}`}
                className={event => isActiveButtonLink(event, button.name)}
              >
                {button.name === 'cart' && totalCartCount > 0 && (
                  <p className="header__items-amount counter">
                    {totalCartCount}
                  </p>
                )}
                {button.name === 'favourites' && favourites.length > 0 && (
                  <p className="header__items-amount counter">
                    {favourites.length}
                  </p>
                )}
              </NavLink>
            )}
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
};
