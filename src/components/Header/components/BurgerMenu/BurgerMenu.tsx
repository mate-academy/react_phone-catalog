import { HeaderIcons } from '../../../icons/HeaderIcons';
import { Nav } from '../Nav';
import styles from './BurgerMenu.module.scss';

type Props = {
  onClose: () => void;
};

export const BurgerMenu = ({ onClose }: Props) => {
  return (
    <div className={styles.overlay}>
      <Nav className={styles.burgerNav} onClose={onClose} />
      <HeaderIcons
        className={styles.menuIcons}
        classIcon={styles.menuIcon}
        onClose={onClose}
      />
    </div>
  );
};
