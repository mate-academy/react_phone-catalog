import styles from './Error.module.scss';

import { useAppSelector } from '../../../store/hooks';

export const Error = () => {
  const error = useAppSelector(state => state.products.error);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.error}>
      <dialog className={styles.error__dialog}>
        <p className={styles.error__text}>{error}</p>
        <div>
          <button className={styles.error__btn} onClick={handleReload}>
            Reload
          </button>
        </div>
      </dialog>
    </div>
  );
};
