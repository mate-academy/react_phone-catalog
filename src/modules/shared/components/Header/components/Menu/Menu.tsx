import styles from './Menu.module.scss';
import { useMenuContext } from 'contexts/MenuContext';

export const Menu = () => {
  const { isMenuOpen, toggleMenu } = useMenuContext();

  return (
    <div className={styles.burger} onClick={toggleMenu}>
      {!isMenuOpen ? (
        <img className={styles.image} src="img/icons/burger.svg" alt="menu" />
      ) : (
        <img className={styles.image} src="img/icons/close.svg" alt="cross" />
      )}
    </div>
  );
};
