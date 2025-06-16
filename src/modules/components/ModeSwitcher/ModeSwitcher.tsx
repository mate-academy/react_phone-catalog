import styles from './ModeSwitcher.module.scss';

type Props = {
  isLightMode: boolean;
  handleSetMode: () => void;
};

export const ModeSwitcher: React.FC<Props> = ({
  isLightMode,
  handleSetMode,
}) => {
  return (
    <div className={styles.mode} onClick={handleSetMode}>
      <div
        className={`${styles.mode__switcher} ${isLightMode ? styles['mode__switcher--light'] : styles['mode__switcher--dark']}`}
      ></div>
    </div>
  );
};
