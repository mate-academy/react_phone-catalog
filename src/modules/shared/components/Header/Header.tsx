import { useEffect, useState } from 'react';
import { cartPath, favouritesPath, settingsPath } from '../../consts/paths';
import { MenuLinkSVGOption } from '../../types/enums';
import { BurgerMenu } from '../BurgerMenu';
import { useLanguage } from '../Contexts/LanguageContext';
import { LogoLink } from '../LogoLink';
import { MenuLink } from '../MenuLink';
import { PageLinks } from '../PageLinks';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { ToggleBurgerMenuButton } from '../ToggleBurgerMenuButton';

export const Header: React.FC = () => {
  const [burgerMenuOpened, setBurgerMenuOpened] = useState(false);
  const { accessSettings, accessFavourites, accessCart } =
    useLanguage().localeTexts;

  const handleToggleBurgerMenuButtonClick = () => {
    setBurgerMenuOpened(opened => !opened);
  };

  const handleLinkClick = () => {
    setBurgerMenuOpened(false);
  };

  const handleResize = () => {
    if (window.innerWidth >= 640) {
      setBurgerMenuOpened(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className={styles.Header}>
      <nav className={styles.Navigation}>
        <menu className={styles.Menu}>
          <li className={styles.LogoLinkWrapper}>
            <LogoLink className={styles.LogoLink} onClick={handleLinkClick} />
          </li>

          <li>
            <PageLinks className={styles.PageLinks} />
          </li>

          <li className={styles.MenuLinksWrapper}>
            <menu className={styles.MenuLinks}>
              <li className={styles.MenuLinksItem}>
                <MenuLink
                  to={settingsPath}
                  alt={accessSettings}
                  svgOption={MenuLinkSVGOption.Settings}
                />
              </li>

              <li className={styles.MenuLinksItem}>
                <MenuLink
                  to={favouritesPath}
                  alt={accessFavourites}
                  svgOption={MenuLinkSVGOption.Heart}
                />
              </li>

              <li className={styles.MenuLinksItem}>
                <MenuLink
                  to={cartPath}
                  alt={accessCart}
                  svgOption={MenuLinkSVGOption.Bag}
                />
              </li>

              <li className={styles.MenuLinksItem}>
                <ToggleBurgerMenuButton
                  burgerMenuOpened={burgerMenuOpened}
                  onClick={handleToggleBurgerMenuButtonClick}
                />
              </li>
            </menu>
          </li>
        </menu>
      </nav>

      <BurgerMenu
        onLinkClick={handleLinkClick}
        className={classNames(
          styles.BurgerMenu,
          burgerMenuOpened && styles.BurgerMenu_opened,
        )}
      />
    </header>
  );
};
