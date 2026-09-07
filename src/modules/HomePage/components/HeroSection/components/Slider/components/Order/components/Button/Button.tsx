import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainContext } from '../../../../../../../../../../context/MainContext';
import { NavLinks } from '../../../../../../../../../../enums/NavLinks';
import styles from './Button.module.scss';

export const Button: React.FC = () => {
  const { imgIndex, repeatColor } = useContext(MainContext);

  const navigate = useNavigate();

  const GRADIENT_STYLE: React.CSSProperties = {
    backgroundImage: `linear-gradient(to right,rgb(137, 28, 232),rgb(117, 97, 250),rgb(233, 99, 255),${repeatColor('rgb(255, 255, 255),', 11)})`,
  };

  const onClickHandler = () => {
    navigate(`/${NavLinks.cart}`);
  };

  return (
    <div className={styles['button-wrapper']}>
      <div className={styles.gradient} />
      <button
        className={styles.button}
        style={{ cursor: imgIndex === 0 ? 'pointer' : 'auto' }}
        onClick={onClickHandler}
      >
        <div className={styles['button-gradient']} style={GRADIENT_STYLE}>
          <div className={styles['button-text']}>Order now</div>
        </div>
      </button>
    </div>
  );
};
