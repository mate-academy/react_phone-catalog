import styles from './BurgerButton.module.scss';

type Props = {
  isMenuOpen: boolean;
  onToggle: () => void;
};

export const BurgerButton = ({ isMenuOpen, onToggle }: Props) => {
  return (
    <button onClick={onToggle} className={styles.button}>
      {isMenuOpen ? (
        <img
          src="/img/header/Close.svg"
          alt="Close menu"
          className={styles.icon}
        />
      ) : (
        <img
          src="/img/header/Menu.svg"
          alt="Open menu"
          className={styles.icon}
        />
      )}
    </button>
  );
};
