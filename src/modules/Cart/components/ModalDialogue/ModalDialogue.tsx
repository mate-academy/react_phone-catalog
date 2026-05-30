import classNames from 'classnames';
import styles from './ModalDialogue.module.scss';
import { useContext } from 'react';
import { ActionsContext } from '../../../../utils/GlobalContext';

type Props = {
  setClose: () => void;
};

export const ModalDialogue: React.FC<Props> = ({ setClose }) => {
  const { setCart } = useContext(ActionsContext);
  const handleConfirm = () => {
    setCart([]);
  };

  return (
    <div className={classNames(styles.modal)}>
      <div className={classNames(styles.modal__content)}>
        <p className={classNames(styles.modal__message)}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>
        <div className={classNames(styles.modal__buttons)}>
          <button
            className={classNames(styles.modal__confirm, styles.modal__button)}
            onClick={handleConfirm}
          >
            confirm
          </button>
          <button
            className={classNames(styles.modal__cancel, styles.modal__button)}
            onClick={setClose}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};
