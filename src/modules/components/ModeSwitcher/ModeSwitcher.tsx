import classNames from 'classnames';
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
        className={classNames(styles.mode__switcher, {
          [styles['mode__switcher--light']]: isLightMode,
          [styles['mode__switcher--dark']]: !isLightMode,
        })}
      ></div>
    </div>
  );
};
