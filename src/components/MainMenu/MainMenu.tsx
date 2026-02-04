import styles from './MainMenu.module.scss';
import Logo from '../Logo/index';
import Menu from '../Menu';

type Props = {
  isMenuOpen: boolean;
  onClose: () => void;
  handleMenuClick: () => void;
};

export const MainMenu: React.FC<Props> = ({
  isMenuOpen,
  onClose,
  handleMenuClick,
}) => {
  return (
    <aside
      className={`${styles.mainMenu} ${isMenuOpen ? styles.open : ''}`}
      id="main-menu"
      aria-hidden={!isMenuOpen}
    >
      <div className={styles.mainMenu__content}>
        <div className={`${styles.topBar} ${styles.mainMenu__top}`}>
          <Logo handleMenuClick={handleMenuClick} />
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

        <div className={styles.mainMenu__bottom}>
          <Menu
            className={styles.mainMenu__nav}
            handleMenuClick={handleMenuClick}
          />
        </div>
      </div>
    </aside>
  );
};
