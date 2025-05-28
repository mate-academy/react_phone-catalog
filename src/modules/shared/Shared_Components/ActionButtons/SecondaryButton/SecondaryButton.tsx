import classNames from 'classnames';
import React from 'react';

// by default chevron arrow points to the left,
// so there is no props for left direction

interface Props {
  onClickHandler: () => void;
  isRight?: boolean;
  isTop?: boolean;
  isClose?: boolean;
  isLoading?: boolean;
  isDark?: boolean;
  isDisabled?: boolean;
}

export const SecondaryButton: React.FC<Props> = ({
  onClickHandler,
  isRight,
  isTop,
  isDark,
  isLoading,
  isDisabled,
}) => {
  return (
    <button
      className={classNames('secondary', {
        'secondary--right': isRight,
        'secondary--top': isTop,
        'secondary--active': !isDisabled,
        'secondary--skeleton': isLoading,
        'secondary--is-Dark': isDark,
        'secondary--is-Dark-Disabled': isDark && isDisabled,
      })}
      onClick={onClickHandler}
      disabled={isDisabled}
    />
  );
};
