import { cartPath, favouritesPath, settingsPath } from '../../consts/paths';
import { Device, MenuLinkSVGOption } from '../../types/types';
import { useLanguage } from '../Contexts/LanguageContext';
import { LogoLink } from '../LogoLink';
import { MenuLink } from '../MenuLink';
import { Navigation } from '../Navigation';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { accessSettings, accessFavourites, accessCart, accessMenu } =
    useLanguage().localeTexts;

  return (
    <header className={styles.Header}>
      <LogoLink className={styles.LogoLink} />
      <Navigation />

      <menu className={styles.MenuLinks}>
        <li className={styles.MenuLinksItem}>
          <MenuLink
            to={settingsPath}
            alt={accessSettings}
            device={Device.NotMobile}
            svgOption={MenuLinkSVGOption.Settings}
            className={styles.MenuLink}
          />
        </li>

        <li className={styles.MenuLinksItem}>
          <MenuLink
            to={favouritesPath}
            alt={accessFavourites}
            device={Device.NotMobile}
            svgOption={MenuLinkSVGOption.Heart}
            className={styles.MenuLink}
          />
        </li>

        <li className={styles.MenuLinksItem}>
          <MenuLink
            to={cartPath}
            alt={accessCart}
            device={Device.NotMobile}
            svgOption={MenuLinkSVGOption.Bag}
            className={styles.MenuLink}
          />
        </li>

        <li className={styles.MenuLinksItem}>
          <MenuLink
            to="/placeholder"
            alt={accessMenu}
            device={Device.Mobile}
            svgOption={MenuLinkSVGOption.Burger}
            className={styles.MenuLink}
          />
        </li>
      </menu>
    </header>
  );
};
