import styles from './CheckOutMessage.module.scss';

type Props = {
  cancel: (val: boolean) => void;
  setCheckOut: (val: boolean) => void;
  clearCart: () => void;
};

export const CheckOutMessage: React.FC<Props> = ({
  cancel,
  setCheckOut,
  clearCart,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.messageContainer}>
        <p className={styles.message}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => {
              clearCart();
              cancel(false);
            }}
          >
            Ок
          </button>
          <button
            className={styles.button}
            onClick={() => {
              cancel(false);
              setCheckOut(false);
            }}
          >
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutMessage;
