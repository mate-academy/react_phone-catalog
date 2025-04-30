import burger from 'assets/img/icons/burger.svg';
import cross from 'assets/img/icons/cross.svg';

import { useMenuContext } from 'contexts/MenuContext';

import styles from './Menu.module.scss';

export const Menu: React.FC = () => {
  const { isMenuOpen, toggleMenu } = useMenuContext();

  return (
    <div className={styles.burger} onClick={toggleMenu}>
      {!isMenuOpen ? (
        <img alt="menu" className={styles.image} src={burger} />
      ) : (
        <img alt="cross" className={styles.image} src={cross} />
      )}
    </div>
  );
};
