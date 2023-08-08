import './style.scss';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { navigate } from '../../types/navigate';
import { PageNavLink } from '../PageNavLink';
import { BurgerMenu } from '../BurgerMenu';

export const Nav = () => {
  const [isNav, setIsNav] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsNav(false);
  }, [location]);

  return (
    <nav className="nav">
      <BurgerMenu setIsNav={setIsNav} isNav={isNav} />
      <ul className={classNames(
        'nav__list',
        { 'nav__list--active': isNav },
      )}
      >
        {navigate.map(({ pathTo, title }) => (
          <li className="nav__listItem" key={title}>
            <PageNavLink to={pathTo} text={title} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
