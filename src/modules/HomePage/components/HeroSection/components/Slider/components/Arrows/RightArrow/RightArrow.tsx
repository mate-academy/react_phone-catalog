import React from 'react';

import { RightArrowSVG } from '../../../../../../../../../svgs/RightArrowSVG';
import styles from '../Arrow.module.scss';

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
