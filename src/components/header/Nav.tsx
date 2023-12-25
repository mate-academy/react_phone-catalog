import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import classNames from 'classnames';

import {
  ACCESSORIES_LINK, HOME_LINK, PHONES_LINK, TABLETS_LINK,
} from '../../helpers/constants/Links';
import { DropDownMenuContext } from '../../helpers/context/DropDownMenuContext';
import { ProductType } from '../../helpers/enums/ProductType';

type NavProps = {
  activeLink?: ProductType,
};

export const Nav = ({ activeLink }: NavProps) => {
  const { collapseMenu } = useContext(DropDownMenuContext);

  const linkClass = 'nav__link';
  const phonesClasses = classNames(linkClass, {
    active: activeLink === ProductType.phone,
  });
  const tabletsClasses = classNames(linkClass, {
    active: activeLink === ProductType.tablet,
  });
  const accessoriesClasses = classNames(linkClass, {
    active: activeLink === ProductType.accessories,
  });

  return (
    <nav className="nav">
      <NavLink
        className="nav__link"
        to={HOME_LINK}
        onClick={collapseMenu}
      >
        home
      </NavLink>

      <NavLink
        className={phonesClasses}
        to={PHONES_LINK}
        onClick={collapseMenu}
      >
        phones
      </NavLink>

      <NavLink
        className={tabletsClasses}
        to={TABLETS_LINK}
        onClick={collapseMenu}
      >
        tablets
      </NavLink>

      <NavLink
        className={accessoriesClasses}
        to={ACCESSORIES_LINK}
        onClick={collapseMenu}
      >
        accessories
      </NavLink>
    </nav>
  );
};

Nav.defaultProps = {
  activeLink: ProductType.all,
};
