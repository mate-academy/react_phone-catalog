import React, { useContext } from 'react';
import styles from '../Arrow.module.scss';
import { MainContext } from '../../../../../../../../../context/MainContext';
import { LeftArrowSVG } from '../../../../../../../../../svgs/LeftArrowSVG';

export const LeftArrow: React.FC = () => {
  const { imgs, setImgIndex } = useContext(MainContext);

  const leftArrowHandler = () => {
    setImgIndex(index => {
      if (index === 0) {
        return imgs.length - 1;
      }

      return index - 1;
    });
  };

  return (
    <button className={styles.arrow} onClick={leftArrowHandler}>
      <LeftArrowSVG />
    </button>
  );
};
