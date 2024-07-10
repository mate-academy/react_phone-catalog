import { Link, NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { StateContext } from '../../Store';

export const classActiveNavLink = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.link, {
    [styles.activeLink]: isActive,
  });

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames([styles.bottomItem], {
    [styles.isActive]: isActive,
  });

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const Menu: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const state = useContext(StateContext);
  const { favorites, bascket } = state;

  const click = () => {
    setIsOpen(false);
  };

  let totalQuantity = 0;

  for (const item of bascket) {
    totalQuantity += item.quantity;
  }

  return (
    <div
      className={classNames(styles.content, {
        [styles.isOpen]: isOpen,
      })}
    >
      <div className={styles.menuTopContent}>
        <div className={styles.menuTop}>
          <Link to="/">
            <img
              src="img/Logo_header_homePage.svg"
              alt="logo"
              className={styles.menuLg}
            />
          </Link>
          <div className={styles.closeButton}>
            <img
              src="img/Close.svg"
              alt="close"
              className={styles.menuIcon}
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>

        <div className={styles.border}></div>
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

      <div className={styles.menuBottomContent}>
        <NavLink to="/favorites" className={getLinkClass} onClick={click}>
          <img src="img/HeartLike_Header_default.svg" alt="favotites" />
          {favorites.length !== 0 && (
            <span className={styles.counter}>{favorites.length}</span>
          )}
        </NavLink>

        <div className={styles.borderRight}></div>

        <NavLink to="/card" className={getLinkClass} onClick={click}>
          <img src="img/ShoppingBag_header.svg" alt="shop" />
          {bascket.length !== 0 && (
            <span className={styles.counter}>{totalQuantity}</span>
          )}
        </NavLink>
      </div>
    </div>
  );
};
