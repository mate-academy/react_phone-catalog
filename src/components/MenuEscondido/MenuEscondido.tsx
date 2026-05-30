import styles from './MenuEscondido.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ItemsFavorites } from '../ItemsFavorites/ItemsFavorites';
import { Favorites } from '../Favorites/Favorites';

export const MenuEscondido = ({ menuOpen, setMenuOpen, calback }) => {
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [itemsfavoritesOpen, setItemsFavoritesOpen] = useState(false);

  const toggleFavorites = () => {
    setFavoritesOpen(!favoritesOpen);
  };

  const toggleItemsFavorites = () => {
    setItemsFavoritesOpen(!itemsfavoritesOpen);
  };

  return (
    <>
      <nav className={`${styles.sidebar} ${menuOpen ? styles.open : ''}`}>
        <div className={styles.menuSuperior}>
          <div className={styles.containerLogo}>
            <img
              className={styles.logo}
              src="src/image/Logo.svg"
              alt="LogoMarcaNiceGadgets"
            />
          </div>

          <div className={styles.containerEspacoBrancoIconMenu}>
            <div className={styles.containerIconMenu} onClick={calback}>
              <img
                src="src\Icons\Close.svg"
                alt=""
                className={styles.iconMenu}
              />
            </div>
          </div>
        </div>

        <ul className={styles.itensMenu}>
          <Link className={styles.itens} to="/" onClick={calback}>
            HOME
          </Link>
          <Link className={styles.itens} to="/phones" onClick={calback}>
            PHONES
          </Link>
          <Link className={styles.itens} to="/tablets" onClick={calback}>
            TABLETS
          </Link>
          <Link className={styles.itens} to="/accessories" onClick={calback}>
            ACCESSORIES
          </Link>
        </ul>

        <div className={styles.menuInferior}>
          <div className={styles.menuFav} onClick={toggleItemsFavorites}>
            <img src="src\Icons\HeartIcon.svg" alt="" className={styles.icon} />
          </div>
          <div className={styles.menuShop} onClick={toggleFavorites}>
            <img
              src="src\Icons\ShoppingBagIcon.svg"
              alt=""
              className={styles.icon}
            />
          </div>
        </div>
      </nav>

      <ItemsFavorites
        itemsfavoritesOpen={itemsfavoritesOpen}
        setItemsFavoritesOpen={setItemsFavoritesOpen}
        calback={toggleItemsFavorites}
      />

      <Favorites
        favoritesOpen={favoritesOpen}
        setFavoritesOpen={setFavoritesOpen}
        calback={toggleFavorites}
      />

      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
};
