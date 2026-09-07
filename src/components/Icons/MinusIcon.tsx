import styles from './Icons.module.scss';

interface MinusIconProps {
  disabled?: boolean;
}

export const MinusIcon: React.FC<MinusIconProps> = ({ disabled = false }) => {
  return (
    <div className={styles.icon}>
      {disabled ? (
        <span className={styles.icon__minusDisableIcon}></span>
      ) : (
        <span className={styles.icon__minusIcon}></span>
      )}
    </div>
  );
};
