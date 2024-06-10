import React from 'react';
import './ButtonNav.scss';
import classNames from 'classnames';

type Props = {
  onClick: () => void;
  direction: 'left' | 'right';
  isEnable?: boolean;
};

export const ButtonNav: React.FC<Props> = ({
  onClick,
  direction,
  isEnable = true,
}) => {
  return (
    <>
      {/* eslint-disable-next-line */}
      <button
        className={classNames('button-nav', `button-nav--${direction}`, {
          'button-nav--disable': !isEnable,
        })}
        type="button"
        onClick={onClick}
        disabled={!isEnable}
      />
    </>
  );
};
