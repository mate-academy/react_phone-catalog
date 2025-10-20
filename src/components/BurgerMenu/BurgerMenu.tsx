import { useEffect } from 'react';
import { NavLinks } from '../NavLinks';
import styles from './BurgerMenu.module.scss';
import { ButtonsRight } from '../ButtonsRight';

interface BurgerMenuProps {
  isClosing: boolean;
  onClose: () => void;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({
  isClosing,
  onClose,
}) => {
  useEffect(() => {
    document.body.style.overflow = isClosing ? 'auto' : 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isClosing]);

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : styles.overlayOpen}`}
    >
      <div
        className={isClosing ? styles.menuClosing : styles.menuOpen}
        onClick={e => e.stopPropagation()}
      >
        <NavLinks onClose={onClose} />
        <ButtonsRight isBurgerMenu={true} onClose={onClose} />
      </div>
    </div>
  );
};
