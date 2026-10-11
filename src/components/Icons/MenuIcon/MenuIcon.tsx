import styles from '../icons.module.scss';

interface MenuIconProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const MenuIcon = ({ isMenuOpen, setIsMenuOpen }: MenuIconProps) => {
  return (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className={styles.iconButton}
    >
      <img
        src={isMenuOpen ? './icons/Close.svg' : './icons/Menu.svg'}
        alt="Menu"
      />
    </button>
  );
};
