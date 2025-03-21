import { NavLink } from 'react-router-dom';
import { LINK_TO } from '../../constants';
import cl from 'classnames';
import s from './Nav.module.scss';

type Props = {
  isMenuOpen?: boolean;
};

export const Nav: React.FC<Props> = ({ isMenuOpen }) => {
  const listItems = [
    LINK_TO.HOME,
    LINK_TO.PHONES,
    LINK_TO.TABLETS,
    LINK_TO.ACCESSORIES,
  ];

  const getListClass = ({ isActive }: { isActive: boolean }) =>
    cl(s.Nav__link, {
      [s.Nav__linkActive]: isActive,
    });

  return (
    <nav className={s.Nav}>
      <ul
        className={cl(s.Nav__list, {
          [s.Nav__listMenu]: isMenuOpen,
        })}
      >
        {listItems.map(i => (
          <li key={i} className={s.Nav__item}>
            <NavLink to={i} className={getListClass}>
              {i === '/' ? 'home' : i.slice(1)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
