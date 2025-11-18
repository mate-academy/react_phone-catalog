import classNames from 'classnames';
import styles from './modalCheckout.module.scss';
import { PersonalDataForm } from './personalDataForm';

export const ModalCheckout = () => {
  return (
    <div className={styles['modal-backdrop']}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title">Checkout</h2>
        <form className={styles.form}>
          <div className={styles['checkbox-container']}>
            <input type="checkbox" id="dataProcessing" required />
            <label htmlFor="dataProcessing" className={styles.agreement}>
              I agree to the processing of my personal data
            </label>
          </div>
          <PersonalDataForm />
          <div className={styles.buttons}>
            <button type="submit">Place Order ($9000)</button>
            <button type="button">Cancel</button>
          </div>
        </form>
        <div className={styles.pagination}>
          <button className={styles.pagination__button}>1</button>
          <button className={styles.pagination__button}>2</button>
          <button
            className={classNames(
              styles.pagination__button,
              styles['pagination__button--active'],
            )}
          >
            3
          </button>
        </div>
      </div>
    </div>
  );
};
