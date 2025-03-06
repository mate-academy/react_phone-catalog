import React from 'react';

import { RightArrowSVG } from '../../../../../../../../../svgs/RightArrowSVG';
import styles from '../Arrow.module.scss';

interface Props {
  setCardIndex: React.Dispatch<React.SetStateAction<number>>;
  getrightButtonCondition: () => boolean;
}

export const RightArrow: React.FC<Props> = ({
  setCardIndex,
  getrightButtonCondition,
}) => {
  function rightArrowHandler() {
    setCardIndex(index => index + 1);
  }

  return (
    <button
      className={styles.arrow}
      onClick={rightArrowHandler}
      disabled={getrightButtonCondition()}
    >
      <RightArrowSVG />
    </button>
  );
};
