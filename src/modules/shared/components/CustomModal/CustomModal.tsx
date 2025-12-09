import classNames from 'classnames';
import React from 'react';
import styles from './CustomModal.module.scss';
type CustomModalProps = {
  onClose?: () => void;
};
const CustomModal: React.FC<CustomModalProps> = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={classNames(styles.customModal)}>
        CustomModal
        <button onClick={onClose}>x</button>
      </div>
      ;
    </div>
  );
};

export default CustomModal;
