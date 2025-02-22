import React, { useContext } from 'react';
import styles from './Button.module.scss';
import { MainContext } from '../../../../../../../../../../context/MainContext';

export const Button: React.FC = () => {
  const { imgIndex, repeatColor } = useContext(MainContext);

  const GRADIENT_STYLE: React.CSSProperties = {
    backgroundImage: `linear-gradient(to right,rgb(137, 28, 232),rgb(117, 97, 250),rgb(233, 99, 255),${repeatColor('rgb(255, 255, 255),', 11)})`,
  };

  return (
    <div className={styles['button-wrapper']}>
      <div className={styles.gradient} />
      <button
        className={styles.button}
        style={{ cursor: imgIndex === 0 ? 'pointer' : 'auto' }}
      >
        <div className={styles['button-gradient']} style={GRADIENT_STYLE}>
          <div className={styles['button-text']}>Order now</div>
        </div>
      </button>
    </div>
  );
};
