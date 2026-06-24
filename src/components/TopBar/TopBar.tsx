import React, { useContext } from 'react';
import styles from './TopBar.module.scss';
import { Nav } from '../Nav';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../ShopContext';
import { ThemeContext } from '../../utils/themeContext';
import { Theme } from '../../../public/api/types/theme';

type Props = {
  isMenuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
};

export const TopBar: React.FC<Props> = ({ isMenuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const { state } = useShop();

  const favCount = Object.keys(state.favorites).length;
  const cartCount = Object.values(state.cart).reduce(
    (sum, it) => sum + it.qty,
    0,
  );

  const goFavorites = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/favorites');
  };

  const goCart = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/cart');
  };

  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () =>
    setTheme(prev => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));

  return (
    <div
      className={[
        styles.top_bar,
        theme === Theme.LIGHT ? styles['top_bar--light'] : '',
      ].join(' ')}
    >
      <a href="/" className={styles.top_bar__logo_link}>
        {theme === Theme.DARK ? (
          <img
            src="img/logo.svg"
            alt="Nice & Gadgets"
            className={styles.top_bar__logo}
          />
        ) : (
          <img
            src="img/LogoLig.svg"
            alt="Nice & Gadgets"
            className={styles.top_bar__logo}
          />
        )}
      </a>

      <div className={styles.top_bar__right}>
        <div className={styles.top_bar__nav}>
          <Nav onClose={() => {}} theme={theme} />
        </div>

        <div className={styles.top_bar__icons}>
          <div className={styles.iconButton} onClick={toggleTheme}>
            {theme === Theme.DARK ? (
              <span
                className={styles.iconButton__theme}
                role="img"
                aria-label="light moon"
              >
                🌕
              </span>
            ) : (
              <span
                className={styles.iconButton__theme}
                role="img"
                aria-label="moon"
              >
                🌑
              </span>
            )}
          </div>

          <div className={styles.iconButton} onClick={goFavorites}>
            {theme === Theme.DARK ? (
              <img src="img/icons/Heart_like.svg" alt="Wish" />
            ) : (
              <img src="img/icons/favouritesLig.svg" alt="Wish" />
            )}
            {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
          </div>
          <div className={styles.iconButton} onClick={goCart}>
            {theme === Theme.DARK ? (
              <img src="img/icons/Cart.svg" alt="Cart" />
            ) : (
              <img src="img/icons/shoppinglig.svg" alt="Cart" />
            )}
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </div>
        </div>
      </div>

      <div className={styles.top_bar__close}>
        <div
          className={`${styles.icon} ${isMenuOpen ? styles['icon--close'] : styles['icon--burger']}`}
          onClick={() => setMenuOpen(!isMenuOpen)}
        />
      </div>
    </div>
  );
};
