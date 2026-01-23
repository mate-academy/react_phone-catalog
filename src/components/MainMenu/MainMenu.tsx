import styles from './MainMenu.module.scss';
import Logo from '../Logo/index';
import Menu from '../Menu';

type Props = {
  isMenuOpen: boolean;
  onClose: () => void;
};

export const MainMenu: React.FC<Props> = ({ isMenuOpen, onClose }) => {
  return (
    isMenuOpen && (
      <div className={styles.backdrop}>
        <aside
          className={`${styles.menu} ${isMenuOpen ? styles['is-open'] : ''}`}
          id="main-menu"
          aria-hidden={!isMenuOpen}
        >
          <div className={styles.topBar}>
            <Logo />
            <div className={styles.topBar__icons}>
              <div className={styles.icon__background}>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className={`${styles.icon} ${styles['icon--close']}`}
                ></button>
              </div>
            </div>
          </div>

          <div className={styles.menu__bottom}>
            <Menu />
          </div>
        </aside>
      </div>
    )
  );
};
