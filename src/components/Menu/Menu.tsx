import { HeaderIcon } from '../HeaderIcon';
import { NavigateLinks } from '../NavigateLinks';
import styles from './Menu.module.scss';

type Props = {
  setShowMenu?: (value: boolean) => void;
  showMenu: boolean;
  headerHeight: number;
};

export const Menu: React.FC<Props> = ({
  setShowMenu,
  showMenu,
  headerHeight,
}) => {
  return (
    <aside
      style={{
        top: `${headerHeight}px`,
        height: `calc(100vh - ${headerHeight}px)`,
      }}
      className={`${styles.menu} ${showMenu ? styles['menu--open'] : ''}`}
      id="menu"
    >
      <NavigateLinks setShowMenu={setShowMenu} />
      {setShowMenu && (
        <div className={styles['menu__button-links']}>
          <div className={styles['menu__button-link']}>
            <HeaderIcon
              iconName="favourites"
              width={'100%'}
              height={64}
              borderHeight={2}
              onClickIcon={() => setShowMenu(false)}
            />
          </div>

          <div
            className={`${styles['menu__button-link']} ${styles['menu__button-link--shadow']}`}
          >
            {' '}
            <HeaderIcon
              iconName="cart"
              width={'100%'}
              height={64}
              borderHeight={2}
              onClickIcon={() => setShowMenu(false)}
            />
          </div>
        </div>
      )}
    </aside>
  );
};
