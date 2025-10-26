import styles from './NavButton.module.scss';

interface NavButtonProps {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  childrenValue: string;
  currentPage?: boolean;
  number?: boolean;
}

export const NavButton: React.FC<NavButtonProps> = ({
  onClick,
  disabled = false,
  active = false,
  childrenValue,
  currentPage = false,
  number = false,
}) => {
  return (
    <div
      className={`
        ${styles.button}
        ${active ? styles.active : ''}
        ${disabled ? styles.disabled : ''}
        ${number ? styles.number : ''}
        ${currentPage ? styles.currentPage : ''}
      `}
      onClick={onClick}
    >
      <img className={styles.img} src={childrenValue} alt={childrenValue} />
    </div>
  );
};
