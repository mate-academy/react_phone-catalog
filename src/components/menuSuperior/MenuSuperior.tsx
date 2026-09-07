import { useState } from 'react';
import styles from './MenuSuperior.module.scss';
import { NavLink } from 'react-router-dom';
import { MenuEscondido } from '../MenuEscondido/MenuEscondido';
import { Favorites } from '../Favorites/Favorites';
import { ItemsFavorites } from '../ItemsFavorites/ItemsFavorites';

export const MenuSuperior = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [itemsfavoritesOpen, setItemsFavoritesOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleFavorites = () => {
    setFavoritesOpen(!favoritesOpen);
  };

  const toggleItemsFavorites = () => {
    setItemsFavoritesOpen(!itemsfavoritesOpen);
  };

  return (
    <div className={styles.menu}>
      <div className={styles.menuLogo}>
        <img
          className={styles.menuLogoImage}
          src="src/image/Logo.svg"
          alt="LogoMarcaNiceGadgets"
        />
      </div>

      <div className={styles.menuSpacerMenuIcon}>
        <div className={styles.menuIconWrapper} onClick={toggleMenu}>
          <img
            src="src\Icons\MenuIcon.svg"
            alt="IconeDeFavoritos"
            className={styles.menuIcon}
          />
        </div>
      </div>

      <div className={styles.menuLinks}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`
          }
        >
          HOME
          {<div className={styles.menuLinkUnderline}></div>}
        </NavLink>
        <NavLink
          to="/phones"
          className={({ isActive }) =>
            `${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`
          }
        >
          PHONES
          {<div className={styles.menuLinkUnderline}></div>}
        </NavLink>
        <NavLink
          to="/tablets"
          className={({ isActive }) =>
            `${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`
          }
        >
          TABLETS
          {<div className={styles.menuLinkUnderline}></div>}
        </NavLink>
        <NavLink
          to="/accessories"
          className={({ isActive }) =>
            `${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`
          }
        >
          ACCESSORIES
          {<div className={styles.menuLinkUnderline}></div>}
        </NavLink>
      </div>

      <div className={styles.menuSpacerIcons}>
        <div className={styles.menuIconContainer}>
          <img
            src="src\Icons\HeartIcon.svg"
            alt="IconeDeFavoritos"
            className={styles.icon}
            onClick={toggleItemsFavorites}
          />
        </div>
        <div className={styles.menuIconContainer}>
          <img
            src="src\Icons\ShoppingBagIcon.svg"
            alt="IconeDeBolsa"
            className={styles.icon}
            onClick={toggleFavorites}
          />
        </div>
      </div>

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

      <MenuEscondido
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        calback={toggleMenu}
      />
    </div>
  );
};
