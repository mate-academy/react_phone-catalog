import React from 'react';

import { LeftArrowSVG } from '../../../../../../../../../svgs/LeftArrowSVG';
import styles from '../Arrow.module.scss';

interface Props {
  cardIndex: number;
  leftArrowHandler: () => void;
}

export const LeftArrow: React.FC<Props> = ({ cardIndex, leftArrowHandler }) => {
  const leftButtonCondition = cardIndex === 0;

  return (
    <button
      className={styles.arrow}
      onClick={leftArrowHandler}
      disabled={leftButtonCondition}
    >
      <LeftArrowSVG />
    </button>
  );
};
