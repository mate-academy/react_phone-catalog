import Menu from '../Menu/index';
import styles from './MainMenu.module.scss';

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
          <div className={styles.menuContent}>
            <div className={styles.topBar}>
              <a href="#">
                <picture>
                  <source
                    srcSet="img/logo-desktop.svg"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="img/logo-tablet.svg"
                    media="(min-width: 576px)"
                  />
                  <img
                    src="img/logo-mobile.svg"
                    alt="The Nice Gadgets Logo"
                    title="The Nice Gadgets Logo"
                    className={styles.topBar__logo}
                  />
                </picture>
              </a>
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
          </div>
        </aside>
      </div>
    )
  );
};
