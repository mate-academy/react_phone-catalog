import { NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import classNames from 'classnames';
import LanguageSelect from '../../../LanguageSelect/LanguageSelect';
import favoritesHeartIcon from '../../../../images/icons/favourites-heart.svg';
// eslint-disable-next-line max-len
import favoritesHearWhitetIcon from '../../../../images/icons/favourites-heart-white.svg';
import shoppingBagIcon from '../../../../images/icons/shopping-bag.svg';
// eslint-disable-next-line max-len
import shoppingBagWhiteIcon from '../../../../images/icons/shopping-bag-white.svg';
import useFavoritesStore from '../../../../stores/useFavoritesStore';
import useCartStore from '../../../../stores/useCartStore';
import useLanguageStore from '../../../../stores/useLanguageStore';
import ThemeSelect from '../../../ThemeSelect/ThemeSelect';
import useThemeStore from '../../../../stores/useThemeStore';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles['menuNav-item'], {
    [styles['menuNav-item-active']]: isActive,
  });

const getButtonClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.icon__button, {
    [styles.icon__button__active]: isActive,
  });

export const MobileMenu: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { favorites } = useFavoritesStore();
  const { getTotalItems } = useCartStore();
  const { t } = useLanguageStore();
  const { currentTheme } = useThemeStore();
  const darkTheme = currentTheme === 'dark';
  const heartIcon = darkTheme ? favoritesHearWhitetIcon : favoritesHeartIcon;
  const bagIcon = darkTheme ? shoppingBagWhiteIcon : shoppingBagIcon;

  return (
    <div
      className={classNames(styles.mobileMenu, {
        [styles.open]: isMenuOpen,
      })}
    >
      <div className={styles.menuNav}>
        <NavLink
          to="/"
          className={getLinkClass}
          onClick={() => setIsMenuOpen(false)}
        >
          {t('nav_home')}
        </NavLink>

        <NavLink
          to="/phones"
          className={getLinkClass}
          onClick={() => setIsMenuOpen(false)}
        >
          {t('nav_phones')}
        </NavLink>

        <NavLink
          to="/tablets"
          className={getLinkClass}
          onClick={() => setIsMenuOpen(false)}
        >
          {t('nav_tablets')}
        </NavLink>

        <NavLink
          to="/accessories"
          className={getLinkClass}
          onClick={() => setIsMenuOpen(false)}
        >
          {t('nav_accessories')}
        </NavLink>
      </div>

      <div className={styles.selects}>
        <LanguageSelect />
        <ThemeSelect />
      </div>

      <div className={styles.buttons}>
        {/* кнопка улюблене */}
        <NavLink
          to="/favourites"
          className={getButtonClass}
          onClick={() => setIsMenuOpen(false)}
        >
          <span className={styles.icon__item}>
            <div className={styles.icon__item__content}>
              <img
                className={styles.icon}
                src={heartIcon}
                alt="favourites heart"
              />

              {favorites.length > 0 && (
                <span className={styles['notification-badge']}>
                  {favorites.length}
                </span>
              )}
            </div>
          </span>
        </NavLink>

        {/* кнопка корзина */}
        <NavLink
          to="/cart"
          className={getButtonClass}
          onClick={() => setIsMenuOpen(false)}
        >
          <span className={styles.icon__item}>
            <div className={styles.icon__item__content}>
              <img className={styles.icon} src={bagIcon} alt="shopping bag" />

              {getTotalItems() > 0 && (
                <span className={styles['notification-badge']}>
                  {getTotalItems()}
                </span>
              )}
            </div>
          </span>
        </NavLink>
      </div>
    </div>
  );
};
