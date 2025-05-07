import React from 'react';
import { Close } from '../../../shared/Icons/Close';
import { SliderButton } from '../../../shared/SliderButton';
import styles from './Modal.module.scss';

type Props = {
  onClose: () => void;
  onClearCast: () => void;
};

export const Modal: React.FC<Props> = ({ onClose, onClearCast }) => {
  return (
    <div className={styles.Modal}>
      <div className={styles.Modal__content}>
        <div className={styles.Modal__top}>
          <p className={styles.Modal__text}>
            Checkout is not implemented yet.
            <br /> Do you want to clear the Cart?
          </p>
          <SliderButton onClick={onClose}>
            <Close />
          </SliderButton>
        </div>

        <button onClick={onClearCast} className={styles.Modal__clearBtn}>
          Yes
        </button>
      </div>
    </div>
  );
};
