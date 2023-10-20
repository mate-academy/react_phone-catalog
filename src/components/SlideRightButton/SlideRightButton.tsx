import React from 'react';
import './SlideRightButton.scss';

type Props = {
  onSlideRight: () => void,
  isDisabled: boolean,
};

export const SlideRightButton: React.FC<Props> = ({
  onSlideRight,
  isDisabled,
}) => {
  return (
    <button
      data-cy="paginationRight"
      type="button"
      className="SlideLeftButton"
      onClick={onSlideRight}
      disabled={isDisabled}
    >
      <div className="icon icon--right" />
    </button>
  );
};
