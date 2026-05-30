import classNames from 'classnames';
import styles from './Navigation.module.scss';
import { NavLink } from 'react-router-dom';
import { NavPosition } from '../../types/NavPositionType';

type Props = {
  navPosition: NavPosition;
};

export const Navigation: React.FC<Props> = ({ navPosition }) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames('link-upper-text', { [styles.active]: isActive });
  };

  const listClassName = `${navPosition}NavList`;
  const itemClassName = `${navPosition}NavItem`;

  const links = ['home', 'phones', 'tablets', 'accessories'];

  return (
    <nav className={styles.nav}>
      <div className={styles[listClassName]}>
        {links.map(link => (
          <NavLink
            key={link}
            to={link === 'home' ? '/' : `/${link}`}
            className={({ isActive }) =>
              classNames(styles[itemClassName], getLinkClass({ isActive }))
            }
          >
            {link}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
