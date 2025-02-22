import React from 'react';
import styles from '../Arrow.module.scss';
import { RightArrowSVG } from '../../../../../../../../../svgs/RightArrowSVG';

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
