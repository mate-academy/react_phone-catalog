import { cartPath, favouritesPath, settingsPath } from '../../consts/paths';
import { Device, MenuLinkSVGOption } from '../../types/types';
import { useLanguage } from '../Contexts/LanguageContext';
import { LogoLink } from '../LogoLink';
import { MenuLink } from '../MenuLink';
import { PageLinks } from '../PageLinks';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { accessSettings, accessFavourites, accessCart, accessMenu } =
    useLanguage().localeTexts;

  return (
    <header className={styles.Header}>
      <nav>
        <menu className={styles.Menu}>
          <li className={styles.LogoLinkWrapper}>
            <LogoLink className={styles.LogoLink} />
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
                  device={Device.NotMobile}
                  svgOption={MenuLinkSVGOption.Settings}
                />
              </li>

              <li className={styles.MenuLinksItem}>
                <MenuLink
                  to={favouritesPath}
                  alt={accessFavourites}
                  device={Device.NotMobile}
                  svgOption={MenuLinkSVGOption.Heart}
                />
              </li>

              <li className={styles.MenuLinksItem}>
                <MenuLink
                  to={cartPath}
                  alt={accessCart}
                  device={Device.NotMobile}
                  svgOption={MenuLinkSVGOption.Bag}
                />
              </li>

              <li className={styles.MenuLinksItem}>
                <MenuLink
                  to="/placeholder"
                  alt={accessMenu}
                  device={Device.Mobile}
                  svgOption={MenuLinkSVGOption.Burger}
                />
              </li>
            </menu>
          </li>
        </menu>
      </nav>
    </header>
  );
};
