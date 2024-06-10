import React from 'react';
import './ButtonQuantity.scss';
import classNames from 'classnames';

type Props = {
  handleClick: (isIncrease: boolean, id: string) => void;
  isIncrease: boolean;
  id: string;
  isDisable: boolean;
};

export const ButtonQuantity: React.FC<Props> = ({
  handleClick,
  isIncrease,
  id,
  isDisable,
}) => {
  return (
    <button
      type="button"
      className={classNames('button-quantity', {
        'button-quantity--plus': isIncrease,
        'button-quantity--minus': !isIncrease,
        'button-quantity--disable': isDisable,
        disable: isDisable,
      })}
      onClick={() => handleClick(isIncrease, id)}
    >
      {isIncrease ? 'add' : 'minus'}
    </button>
  );
};
