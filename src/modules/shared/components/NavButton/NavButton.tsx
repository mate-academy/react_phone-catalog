import styles from './NavButton.module.scss';

interface NavButtonProps {
  onClick: () => void;
  disabled?: boolean;
  childrenValue: string;
  slider?: boolean;
}

export const NavButton: React.FC<NavButtonProps> = ({
  onClick,
  disabled = false,
  childrenValue,
  slider,
}) => {
  return (
    <div
      className={`
        ${styles.button}
        ${disabled ? styles.disabled : ''}
        ${slider ? styles.slider : ''}
      `}
      onClick={onClick}
    >
      <img className={styles.img} src={childrenValue} alt={childrenValue} />
    </div>
  );
};
