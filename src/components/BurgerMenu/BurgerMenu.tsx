import React from 'react';
import styles from './BurgerMenu.module.scss';
import classNames from 'classnames';
import { PageSection } from '../../types/PageSection';
import { useAppContext } from '../../AppContext';

interface Props {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BurgerMenu: React.FC<Props> = ({ setIsMenuOpen }) => {
  const { setCurrentPage, currentPage } = useAppContext();

  const handleOpenPage = (link: PageSection) => {
    setCurrentPage(link);
    setIsMenuOpen(false);
  };

  const handleSetCart = () => {
    setCurrentPage(PageSection.Cart);
    setIsMenuOpen(false);
  };

  const handleSetFavourite = () => {
    setCurrentPage(PageSection.Favorites);
    setIsMenuOpen(false);
  };

  const pagesToShow = Object.values(PageSection).filter(
    link => link !== PageSection.Favorites && link !== PageSection.Cart,
  );

  return (
    <div className={styles.menu}>
      <div className={styles.menu__header}>
        <a href="#" className={styles.menu__logo}>
          <img src="img/Logo.svg" alt="" />
        </a>
        <button
          className={styles.menu__close}
          onClick={() => setIsMenuOpen(false)}
        >
          <span className={styles['menu__icon-close']}></span>
        </button>
      </div>
      <nav className={styles.menu__navigation}>
        <ul className={styles.menu__list}>
          {pagesToShow.map(link => (
            <li
              className={classNames(
                styles.menu__item,
                styles['menu__item--page'],
                {
                  [styles['menu__item--active']]: currentPage === link,
                },
              )}
              key={link}
              onClick={() => handleOpenPage(link)}
            >
              <a
                href="#"
                className={classNames(styles.menu__link, {
                  [styles['menu__link--active']]: currentPage === link,
                })}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.menu__footer}>
        <a onClick={handleSetFavourite} className={styles['menu__footer-link']}>
          <img src="img/header/favorite.svg" alt="favorite" />
        </a>
        <a onClick={handleSetCart} className={styles['menu__footer-link']}>
          <img src="img/header/cart.svg" alt="cart" />
        </a>
      </div>
    </div>
  );
};
