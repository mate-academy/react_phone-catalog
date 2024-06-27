import { Link, NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';
import classNames from 'classnames';
// import { useState } from 'react';

export const classActiveNavLink = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.link, {
    [styles.activeLink]: isActive,
  });

// const getLinkClass = ({ isActive }: { isActive: boolean }) =>
//   classNames([styles.bottomItem], {
//     [styles.isActive]: isActive,
//   });

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const Menu: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  // const [isActiveButton, setIsActiveButton] = useState(false);

  // const getBottomIconClass = () => {
  //   return classNames([styles.bottomItem], {
  //     [styles.isActive]: isActiveButton,
  //   });
  // };

  const click = () => {
    setIsOpen(false);
    // setIsActiveButton(true);
  };

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
        <div className={styles.bottomItem}>
          <NavLink to="/favorites" className={styles.icon} onClick={click}>
            <img src="/img/HeartLike_Header_default.svg" alt="favotites" />
          </NavLink>
        </div>

        <div className={styles.borderRight}></div>

        <div className={styles.bottomItem}>
          <NavLink to="/card" className={styles.icon} onClick={click}>
            <img src="/img/ShoppingBag_header.svg" alt="shop" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
