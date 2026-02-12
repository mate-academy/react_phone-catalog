/* eslint-disable import/no-extraneous-dependencies */
import classes from './Navigation.module.scss';
import { NavigationAction } from '../../elements/NavigationAction';

import styles from 'classnames';
import { useTranslation } from 'react-i18next';
import { ROUTES_CONFIG } from '../../constants/routes';
import { RoutePath } from '../../types/RoutePath';
import { useCart } from '../../utils/hooks/Context/useCart';
import { useFavorites } from '../../utils/hooks/Context/useFavorites';
import { useBurgerMenu } from '../../utils/hooks/Context/useBurgerMenu';
import { scrollTop } from '../../services/layouts';
import { LanguageSwitcher } from '../../elements/LanguageSwitcher';
import { ThemeSwitcher } from '../../elements/ThemeSwitcher';

type Props = {
  isMobile?: boolean;
};

export const Navigation: React.FC<Props> = ({ isMobile = false }) => {
  const { t } = useTranslation();
  const textsLinks = ROUTES_CONFIG.filter(
    link => link.nav?.isText && !link.nav?.hide && link.nav,
  );
  const iconLinks = ROUTES_CONFIG.filter(
    link => link.nav?.isIcon && !link.nav?.hide && link.nav,
  );

  const { cart } = useCart();
  const { favorites } = useFavorites();

  const badgeByRoute: Partial<Record<RoutePath, number>> = {
    [RoutePath.Favorites]: favorites.length,
    [RoutePath.Cart]: cart.reduce((acc, el) => el.count + acc, 0),
  };

  const { close: onClose } = useBurgerMenu();

  const handleClick = () => {
    scrollTop();

    if (isMobile) {
      onClose();
    }
  };

  return (
    <nav
      className={styles(
        isMobile ? classes['navagition-mobile'] : classes.navigation,
      )}
    >
      <div
        className={styles(
          isMobile
            ? classes['navagition-mobile__links']
            : classes.navigation__links,
        )}
      >
        {textsLinks.map(link => (
          <NavigationAction
            as="link"
            to={link.path}
            type="text"
            onClick={handleClick}
            key={link.label}
          >
            {t(link.label as string)}
          </NavigationAction>
        ))}

        {isMobile && <LanguageSwitcher />}
        {isMobile && <ThemeSwitcher />}
      </div>

      <div
        className={styles(
          isMobile
            ? classes['navagition-mobile__buttons']
            : classes.navigation__buttons,
        )}
      >
        {!isMobile && <ThemeSwitcher />}
        {!isMobile && <LanguageSwitcher />}
        {iconLinks.map(link => (
          <NavigationAction
            as="link"
            to={link.path}
            onClick={handleClick}
            type="button"
            key={link.label}
            badgeCount={badgeByRoute[link.path]}
          >
            <span className={`icon icon--${link.icon}`} />
          </NavigationAction>
        ))}
      </div>
    </nav>
  );
};
