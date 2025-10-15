import { NavLinks } from '../NavLinks';
import styles from './BurgerMenu.module.scss';

interface BurgerMenuProps {
  isClosing: boolean;
  onClose: () => void;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({
  isClosing,
  onClose,
}) => {
  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : styles.overlayOpen}`}
    >
      <div
        className={isClosing ? styles.menuClosing : styles.menuOpen}
        onClick={e => e.stopPropagation()}
      >
        <NavLinks onClose={onClose} />
      </div>
    </div>
  );
};
