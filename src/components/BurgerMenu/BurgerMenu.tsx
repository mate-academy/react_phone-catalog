import { NavLinks } from '../NavLinks';
import styles from './BurgerMenu.module.scss';

interface BurgerMenuProps {
  onClose: () => void;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.menu} onClick={e => e.stopPropagation()}>
        <NavLinks />
      </div>
    </div>
  );
};
