import styles from './Burger.module.scss';

type BurgerProps = {
  toggleMenu: () => void;
};

export const Burger: React.FC<BurgerProps> = ({ toggleMenu }) => {
  return (
    <div className={styles.button}>
      <button className={styles.burger} aria-label="Menu" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  );
};
