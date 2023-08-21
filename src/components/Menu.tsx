import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  isMenuOpened: boolean,
};
const headerLinks = ['home', 'phones', 'tablets', 'accessories'];
const footerLinks = ['github', 'contacts', 'rights'];

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
          to={`/${link}`}
        >
          {link}
        </NavLink>
      ))}
    </div>
  </div>
);
