import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import {
  ACCESSORIES_LINK, HOME_LINK, PHONES_LINK, TABLETS_LINK,
} from '../../helpers/constants/Links';
import { ProductType } from '../../helpers/enums/ProductType';

type NavProps = {
  activeCategory?: ProductType
};

export const Nav = ({ activeCategory }: NavProps) => {
  const navLinkPhonesClasses = classNames('nav__link', {
    active: activeCategory === ProductType.phone,
  });
  const navLinkTabletsClasses = classNames('nav__link', {
    active: activeCategory === ProductType.tablet,
  });
  const navLinkAccessoriesClasses = classNames('nav__link', {
    active: activeCategory === ProductType.accessories,
  });

  return (
    <nav className="nav">
      <NavLink className="nav__link" to={HOME_LINK}>home</NavLink>

      <NavLink
        className={navLinkPhonesClasses}
        to={PHONES_LINK}
      >
        phones
      </NavLink>

      <NavLink
        className={navLinkTabletsClasses}
        to={TABLETS_LINK}
      >
        tablets
      </NavLink>

      <NavLink
        className={navLinkAccessoriesClasses}
        to={ACCESSORIES_LINK}
      >
        accessories
      </NavLink>
    </nav>
  );
};

Nav.defaultProps = {
  activeCategory: -1,
};
