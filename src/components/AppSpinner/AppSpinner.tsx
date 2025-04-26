import styles from './AppSpinner.module.scss';
import cn from 'classnames';
import { Audio } from 'react-loader-spinner';

interface AppSpinnerProps {
  size?: number;
  color?: string;
  label?: string;
  fullScreen?: boolean;
  visible?: boolean;
}

export const AppSpinner = ({
  size = 80,
  color = '#00BFFF',
  label = 'Loading...',
  fullScreen = false,
  visible = true,
}: AppSpinnerProps) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      className={cn(styles.spinnerWrapper, { 'styles.fullScreen': fullScreen })}
    >
      <Audio
        height={size}
        width={size}
        color={color}
        ariaLabel="loading-spinner"
      />
      {label && <p className={styles.loadingLabel}>{label}</p>}
    </div>
  );
};
