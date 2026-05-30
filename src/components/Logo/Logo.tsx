import styles from './Logo.module.scss';
import { LogoIcon } from 'components/svg';

export const Logo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container__logoWrapper}>
        <span className={styles.container__logoWrapper__iconContainer}>👌</span>
        <LogoIcon />
      </div>
    </div>
  );
};
