import React from 'react';
import classNames from 'classnames';
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
      className={classNames('SlideRightButton', {
        disabled: isDisabled,
      })}
      onClick={onSlideRight}
    >
      <div className="icon icon--right" />
    </button>
  );
};
