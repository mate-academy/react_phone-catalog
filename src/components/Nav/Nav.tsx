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

  const handlerScroll = (condition:boolean) => {
    const scroll = condition ? 'hidden' : '';

    if (scroll === 'hidden') {
      const fullWidth = window.innerWidth;
      const partWidth = window.document.documentElement.clientWidth;
      const padding = String(fullWidth - partWidth).concat('px');

      window.document.body.style.paddingRight = padding;
    } else {
      window.document.body.style.paddingRight = '0';
    }

    window.document.body.style.overflow = scroll;
  };

  useEffect(() => {
    handlerScroll(isNav);
  }, [isNav]);

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
