import { NavLink } from 'react-router-dom';
import styles from './NavigateLinks.module.scss';
import classNames from 'classnames';

export const NavigateLinks = ({
  setShowMenu,
}: {
  setShowMenu?: (value: boolean) => void;
}) => {
  const links = ['Home', 'Phones', 'Tablets', 'Accessories'];

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.nav__link, { [styles['is-active']]: isActive });

  const handleClick = () => {
    return setShowMenu && setShowMenu(false);
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        {links.map(link => (
          <li className={styles.nav__item} key={link}>
            <NavLink
              to={link === 'Home' ? '/' : `/${link.toLocaleLowerCase()}`}
              className={getLinkClass}
              onClick={handleClick}
            >
              {link}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
