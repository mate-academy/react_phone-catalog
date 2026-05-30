import classNames from 'classnames';

import { Theme } from '@sTypes/Theme';
import { toggle } from '@features/themeSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import styles from './Switcher.module.scss';

export const Switcher = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.theme);

  return (
    <div
      className={classNames(styles.switcher, {
        [styles['switcher--dark']]: theme === Theme.dark,
      })}
    >
      <button
        className={styles.switcher__content}
        onClick={() => dispatch(toggle())}
      >
        <div className={styles.switcher__circle}></div>
      </button>
    </div>
  );
};
