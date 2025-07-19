import { Icon } from '../SheredNavigation/Icon/Icon';
import { Navigation } from '../SheredNavigation/Navigation/Navigation';
import { BurgerButton, Logo } from '../SheredNavigation';
import { navLinks } from '../../constants/navLinks';
import { useCounts } from '../../hooks/useCounts';

import styles from './Header.module.scss';

import heartIcon from '../../../public/img/icons/heartIcon.svg';
import shoppingBagIcon from '../../../public/img/icons/shoppingBagIcon.svg';

import './Header.module.scss';

type Props = {
  onBurgerClick: () => void;
  isAsideOpen: boolean;
};

export const Header: React.FC<Props> = ({ onBurgerClick, isAsideOpen }) => {
  const { favoriteCount, cartCount } = useCounts();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.headerNav}>
          <Navigation links={navLinks} view="header" />
        </div>

        <div className={styles.iconGroup}>
          <Icon
            to="/favorites"
            icon={heartIcon}
            alt="Favorites"
            count={favoriteCount}
            isMobile={false}
            showCount={true}
          />

          <Icon
            to="/cart"
            icon={shoppingBagIcon}
            alt="Cart"
            count={cartCount}
            locationClass={styles.icon}
            countClassName={styles.count}
            showCount={true}
          />
        </div>

        <div className={styles.burger}>
          <BurgerButton
            isOpen={isAsideOpen}
            onToggle={onBurgerClick}
            className={styles.button}
          />
        </div>
      </div>
    </header>
  );
};
