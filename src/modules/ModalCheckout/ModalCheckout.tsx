import { useContext } from 'react';
import styles from './ModalCheckout.module.scss';
import { DispatchContext, StateContext } from '../../Store';

type Props = {
  setIsCheckout: (a: boolean) => void;
};

export const ModalCheckout = ({ setIsCheckout }: Props) => {
  const state = useContext(StateContext);
  const { bascket } = state;
  const dispatch = useContext(DispatchContext);

  const handleClearCart = () => {
    for (const item of bascket) {
      dispatch({
        type: 'removeAllFromBascket',
        payload: { itemId: item.itemId },
      });
    }
  };

  const handleReturnToCart = () => {
    setIsCheckout(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.message}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>
        <div className={styles.buttons}>
          <button className={styles.buttonYes} onClick={handleClearCart}>
            yes
          </button>
          <button className={styles.buttonNo} onClick={handleReturnToCart}>
            no
          </button>
        </div>
      </div>
    </div>
  );
};
