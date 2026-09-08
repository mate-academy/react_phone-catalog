import React from 'react';
import styles from './ModuleDialog.module.scss';

type Props = {
  setOpenModule: (isOpen: boolean) => void;
  clearCart: () => void;
};

const ModuleDialog: React.FC<Props> = ({ setOpenModule, clearCart }) => {
  const continueShopping = () => {
    setOpenModule(false);
  };

  return (
    <div className={styles.module}>
      <div className={styles.module__container}>
        <h3 className={styles.module__title}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </h3>
        <button onClick={continueShopping} className={styles.module__button}>
          Continue shopping
        </button>
        <button
          onClick={clearCart}
          className={styles.module__button + ' ' + styles.module__button_clear}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ModuleDialog;
