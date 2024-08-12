/* eslint-disable max-len */
import { useCallback } from 'react';
import classNames from 'classnames';
import { useAppDispatch } from '../../redux/hooks';
import { setUpdatedAt } from '../../redux/slices/updatedAtSlice';
import { clearErrorMsg as clearProductsError } from '../../redux/slices/productsSlice';
import { clearErrorMsg as clearPhonesError } from '../../redux/slices/phonesSlice';
import { clearErrorMsg as clearTabletsError } from '../../redux/slices/tabletsSlice';
import { clearErrorMsg as clearAccessoriesError } from '../../redux/slices/accessoriesSlice';
import styles from './ErrorNotification.module.scss';

interface Props {
  errorMsg?: string;
  noProducts?: boolean;
  inSlider?: boolean;
  name?: string;
}

export const ErrorNotification: React.FC<Props> = ({
  errorMsg = '',
  noProducts = false,
  inSlider = false,
  name = 'products',
}) => {
  const dispatch = useAppDispatch();

  const message: string =
    errorMsg || (noProducts ? `There are no ${name} yet` : '');

  const reload = useCallback(() => {
    dispatch(setUpdatedAt(+new Date()));

    dispatch(clearProductsError());
    dispatch(clearPhonesError());
    dispatch(clearTabletsError());
    dispatch(clearAccessoriesError());
  }, [dispatch]);

  if (errorMsg && noProducts) {
    return;
  }

  return (
    <div
      className={classNames(
        { [styles.defaultNotification]: !inSlider },
        {
          [styles.sliderNotification]: inSlider,
        },
      )}
    >
      <div
        className={classNames(
          { [styles.defaultContent]: !inSlider },
          { [styles.sliderContent]: inSlider },
        )}
      >
        <p className={styles.message}>{message}</p>

        {!!errorMsg && (
          <button className={styles.reloadBtn} onClick={reload}>
            Reload
          </button>
        )}
      </div>
    </div>
  );
};
