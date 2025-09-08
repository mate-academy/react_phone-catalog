import React, { useContext } from 'react';
import { Nav } from '../Nav';
import styles from './Menu.module.scss';
import { TopBar } from '../TopBar';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../ShopContext';
import { ThemeContext } from '../../utils/themeContext';
import { Theme } from '../../../public/api/types/theme';

type Props = {
  isMenuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
};

export const Menu: React.FC<Props> = ({ isMenuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const { state } = useShop();
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () =>
    setTheme(prev => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));

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

  return (
    <>
      {isMenuOpen && (
        <div
          className={`${styles.overlay} ${isMenuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={[
          `${styles.pageMenu} ${isMenuOpen ? styles.open : ''}`,
          theme === Theme.LIGHT ? styles['pageMenu--light'] : '',
        ].join(' ')}
      >
        <div className={styles.menu}>
          <div className={styles.menuTop}>
            <TopBar isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
          </div>
          <div className={styles.menuContainer}>
            <Nav onClose={() => setMenuOpen(false)} theme={theme} />
          </div>
          <div className={styles.iconTheme} onClick={toggleTheme}>
            {theme === Theme.DARK ? (
              <span
                className={styles.iconTheme__theme}
                role="img"
                aria-label="light moon"
              >
                LIGHT MODE 🌕
              </span>
            ) : (
              <span
                className={styles.iconTheme__theme}
                role="img"
                aria-label="moon"
              >
                DARK MODE 🌑
              </span>
            )}
          </div>

          <div className={styles.menuBottom}>
            <button className={styles.menuBottom__heart} onClick={goFavorites}>
              {theme === Theme.DARK ? (
                <img src="img/icons/Heart_like.svg" alt="Wish" />
              ) : (
                <img src="img/icons/favouritesLig.svg" alt="Wish" />
              )}
              {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
            </button>
            <button className={styles.menuBottom__cart} onClick={goCart}>
              {theme === Theme.DARK ? (
                <img src="img/icons/Cart.svg" alt="Cart" />
              ) : (
                <img src="img/icons/shoppinglig.svg" alt="Cart" />
              )}
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
