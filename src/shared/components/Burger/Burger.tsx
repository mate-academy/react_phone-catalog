import { FavoriteAndBag } from '../FavoriteAndBag';
import { Navigation } from '../Navigation';
import styles from './Burger.module.scss';

type Props = {
  onClose: () => void;
};

export const Burger: React.FC<Props> = ({ onClose }) => {
  return (
    <div className={styles.burgerMenu}>
      <Navigation
        listClassName={styles.burgerNavigation}
        itemClassName={styles.burgerNavigationItem}
        onNavigate={onClose}
      />

      <div className={styles.onlyPhoneWrapper}>
        <FavoriteAndBag onClose={onClose} />
      </div>
    </div>
  );
};
