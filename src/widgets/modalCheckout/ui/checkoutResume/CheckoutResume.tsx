import { LoaderSpinner } from '@ui/skeletons';
import styles from './checkoutResume.module.scss';
import { useCheckout, useSubmitRequest } from '@widgets/modalCheckout/model';
import { FormIDs } from '@widgets/modalCheckout/types';

export const CheckoutResume = () => {
  const { cart, filled, dataProcessingAgreement } = useCheckout();

  const { onSubmit } = useSubmitRequest();

  return (
    <form id={FormIDs.AGREEMENT} onSubmit={onSubmit}>
      <h3>Order review</h3>
      <ul className={styles['preview-container']}>
        {typeof cart === 'string' ? (
          <LoaderSpinner />
        ) : (
          cart.products.map(el => (
            <li className={styles['preview-item']} key={el.product.id}>
              <img src={el.product.images[0]} className={styles.image} />
              <strong>{el.product.name}</strong>
              <div className={styles.priceCont}>
                <span className={styles.amount}>{`${el.amount} x`}</span>
                <span className={styles.total}>{`$${el.total}`}</span>
              </div>
            </li>
          ))
        )}
      </ul>
      <div className={styles['checkbox-container']}>
        <input
          type="checkbox"
          className={styles.checkbox}
          id="data-processing"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.checked;

            dataProcessingAgreement.current = val;
            filled.current[FormIDs.AGREEMENT] = val;
          }}
        />
        <label htmlFor="dataProcessing" className={styles.agreement}>
          - I agree to the processing of my personal data*
        </label>
      </div>
    </form>
  );
};
