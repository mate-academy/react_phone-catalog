import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  isMenuOpened: boolean,
};
const headerLinks = ['home', 'phones', 'tablets', 'accessories'];
const footerLinks = ['github', 'contacts', 'rights'];
const githubLink
  = 'https://github.com/ihorivna007/react_phone-catalog/tree/develop';

export const Menu:React.FC<Props> = ({ isMenuOpened }) => (
  <div className="menu">
    <div
      className={classNames('menu__cover', {
        active: isMenuOpened,
      })}
    >
      {headerLinks.map(link => (
        <NavLink
          key={link}
          className="text__uppercase"
          to={link !== 'home' ? `/${link}` : '/'}
        >
          {link}
        </NavLink>
      ))}

      <div className="menu__line" />

      {footerLinks.map(link => (
        <NavLink
          key={link}
          className="text__uppercase"
          to={link === 'github' ? githubLink : `/${link}`}
        >
          {link}
        </NavLink>
      ))}
    </div>
  </div>
);
