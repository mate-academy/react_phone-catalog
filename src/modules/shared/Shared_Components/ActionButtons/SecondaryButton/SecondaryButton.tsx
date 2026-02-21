import classNames from 'classnames';
import React from 'react';

// by default chevron arrow points to the left,
// so there is no props for left direction

interface Props {
  onClickHandler: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
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
  isClose,
}) => {
  return (
    <button
      className={classNames('secondary', {
        'secondary--loading': isLoading,
        'secondary--right': isRight,
        'secondary--top': isTop,
        'secondary--active': !isDisabled,
        'secondary--skeleton': isLoading,
        'secondary--is-Dark': isDark,
        'secondary--is-Dark-Disabled': isDark && isDisabled,
        'secondary--closed': isClose,
        'secondary--closed-dark': isClose && isDark,
      })}
      onClick={onClickHandler}
      disabled={isDisabled}
    />
  );
};
