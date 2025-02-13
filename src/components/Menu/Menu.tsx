import classNames from 'classnames';
import styles from './Menu.module.scss';
import { PageLinks } from '../../types/PageLinks';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export const Menu = () => {
  const { activeLink, handlePageLinkClick } = useContext(AppContext)!;

  return (
    <>
      <aside className={`${styles.menu} ${styles.page__menu}`} id="menu">
        <div className="container">
          <div className={styles.menu__linksContainer}>
            <a
              // href=""
              className={classNames(styles.menu__link, {
                [styles.menu__linkActive]: activeLink === PageLinks.HOME,
              })}
              onClick={() => handlePageLinkClick(PageLinks.HOME)}
            >
              Home
            </a>
            <a
              // href=""
              className={classNames(styles.menu__link, {
                [styles.menu__linkActive]: activeLink === PageLinks.PHONES,
              })}
              onClick={() => handlePageLinkClick(PageLinks.PHONES)}
            >
              Phones
            </a>
            <a
              // href=""
              className={classNames(styles.menu__link, {
                [styles.menu__linkActive]: activeLink === PageLinks.TABLETS,
              })}
              onClick={() => handlePageLinkClick(PageLinks.TABLETS)}
            >
              Tablets
            </a>
            <a
              // href=""
              className={classNames(styles.menu__link, {
                [styles.menu__linkActive]: activeLink === PageLinks.ACCESSORIES,
              })}
              onClick={() => handlePageLinkClick(PageLinks.ACCESSORIES)}
            >
              Accessories
            </a>
          </div>
        </div>

        <div className={styles.menu__buttonsContainer}>
          <a
            // href=""
            className={classNames(
              styles.menu__button,
              styles.menu__favourites,
              {
                [styles.menu__linkActive]: activeLink === PageLinks.LIKED,
              },
            )}
            onClick={() => handlePageLinkClick(PageLinks.LIKED)}
          ></a>
          <a
            // href=""
            className={classNames(styles.menu__button, styles.menu__cart, {
              [styles.menu__linkActive]: activeLink === PageLinks.CART,
            })}
            onClick={() => handlePageLinkClick(PageLinks.CART)}
          ></a>
        </div>
      </aside>
    </>
  );
};
