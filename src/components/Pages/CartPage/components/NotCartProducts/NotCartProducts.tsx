import { useContext } from 'react';
import styles from './NotCartProducts.module.scss';
import classNames from 'classnames';
import { GlobalContext } from '../../../../shared/GlobalContext/GlobalContext';

export const NotCartProducts = () => {
  const { isSunSelected } = useContext(GlobalContext);

  return (
    <div className={styles.notFound}>
      <h2
        className={classNames(styles.notFound__title, {
          [styles.notFound__title_dark]: !isSunSelected,
        })}
      >
        Your cart is empty
      </h2>
      <div
        className={classNames(styles.notFound__error, {
          [styles.notFound__error_dark]: !isSunSelected,
        })}
      ></div>
    </div>
  );
};
