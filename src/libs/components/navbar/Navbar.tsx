import classNames from 'classnames';

import './styles.scss';

import { NavbarLink } from '../navbar-link/NavbarLink';
import { Button } from '../button/Button';
import { NavbarLinkType } from './libs/types/navbar-links.type';
import { ButtonViews } from '../../enums';

type Props = {
  links: NavbarLinkType[],
  isHeader?: boolean,
};

export const Navbar: React.FC<Props> = ({ links, isHeader }) => {
  return (
    <nav className={classNames('navbar', {
      'navbar--header': isHeader,
    })}
    >
      {isHeader && (
        <Button
          className="navbar__show-on-tablet-btn"
          view={ButtonViews.NAVBAR}
          aria-label="Show catalog"
        />
      )}

      <ul className="navbar__list">
        {links.map(link => (
          <li
            className="navbar__item"
            key={link.url}
          >
            <NavbarLink link={link} className="navbar__link" />
          </li>
        ))}
      </ul>
    </nav>
  );
};
