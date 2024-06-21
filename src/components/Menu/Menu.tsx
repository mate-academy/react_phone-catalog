import { Link, NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';
import classNames from 'classnames';

export const classActiveNavLink = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.link, {
    [styles.activeLink]: isActive,
  });

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const Menu: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <div className={styles.menu} style={{ right: isOpen ? '0' : '-100vw' }}>
      <div className={styles.menuTop}>
        <Link to="/" className={styles.menuLogo}>
          <img
            src="img/Logo_header_homePage.svg"
            alt="logo"
            className={styles.menuLg}
          />
        </Link>
        <img
          src="img/Close.svg"
          alt="close"
          className={styles.menuIcon}
          onClick={() => setIsOpen(false)}
        />
      </div>
      <div className={styles.menuContent}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink
              to="/"
              className={classActiveNavLink}
              onClick={() => setIsOpen(false)}
            >
              home
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to="/phones"
              className={classActiveNavLink}
              onClick={() => setIsOpen(false)}
            >
              phones
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to="/tablets"
              className={classActiveNavLink}
              onClick={() => setIsOpen(false)}
            >
              tablets
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to="/accessories"
              className={classActiveNavLink}
              onClick={() => setIsOpen(false)}
            >
              accessories
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
