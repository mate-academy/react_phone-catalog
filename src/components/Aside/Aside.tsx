import classNames from 'classnames';
import { navLinks } from '../../constants/navLinks';
import { BurgerButton, Icon, Logo, Navigation } from '../SheredNavigation';

import heartIcon from '../../../public/img/icons/heartIcon.svg';
import shoppingBagIcon from '../../../public/img/icons/shoppingBagIcon.svg';

import styles from './Aside.module.scss';

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
};

export const Aside: React.FC<Props> = ({ isOpen = false, onClose }) => {
  return (
    <aside className={classNames(styles.aside, { [styles.open]: isOpen })}>
      <div className={styles.top}>
        <Logo onClick={onClose} />

        <BurgerButton
          isOpen={isOpen}
          onToggle={onClose}
          className={styles.button}
        />
      </div>

      <div className={styles.asideNaw}>
        <Navigation links={navLinks} view="mobile" onLinkClick={onClose} />
      </div>
      <div className={styles.iconsGroup}>
        <Icon
          to="/favorites"
          icon={heartIcon}
          alt="Favorites"
          isMobile={true}
          containerClassName={styles.icon}
          onClick={onClose}
          showCount={false}
        />

        <Icon
          to="/cart"
          icon={shoppingBagIcon}
          alt="Cart"
          containerClassName={styles.icon}
          countClassName={styles.count}
          isMobile={true}
          onClick={onClose}
          showCount={false}
        />
      </div>
    </aside>
  );
};
