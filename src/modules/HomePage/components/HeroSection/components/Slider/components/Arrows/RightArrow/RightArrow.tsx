import React from 'react';
import styles from '../Arrow.module.scss';
import { RightArrowSVG } from '../../../../../../../../../svgs/RightArrowSVG';

interface Props {
  rightArrowHandler: () => void;
}

export const RightArrow: React.FC<Props> = React.memo(
  ({ rightArrowHandler }) => {
    return (
      <button className={styles.arrow} onClick={rightArrowHandler}>
        <RightArrowSVG />
      </button>
    );
  },
);

RightArrow.displayName = 'RightArrow';
