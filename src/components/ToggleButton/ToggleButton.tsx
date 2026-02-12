import { useContext } from 'react';
import styles from './ToggleButton.module.scss';
import { AppContext } from '../../context/AppContext';

export const ToggleButton = () => {
  const { handleTheme } = useContext(AppContext)!;

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={styles.switch} htmlFor="toggle">
      <input type="checkbox" id="toggle" onChange={handleTheme} />
      <span
        className={`${styles.switch__slider} ${styles.switch__round}`}
      ></span>
    </label>
  );
};
