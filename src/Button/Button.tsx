import React from 'react';
import './Button.scss';
import classNames from 'classnames';

type Props = {
  number: number;
  setButtonNumber: (newButtonNumber: number) => void;
  selectedButtonNumber: number;
  setSelectedButtonNumber: (newButtonNumber: number) => void;
};

export const ButtonWithNumber: React.FC<Props> = ({
  number,
  setButtonNumber,
  selectedButtonNumber,
  setSelectedButtonNumber,
}) => {
  return (
    <div
      className={classNames('button', {
        'button--active': selectedButtonNumber === number,
      })}
      onClick={() => {
        setButtonNumber(number);
        setSelectedButtonNumber(number);
        window.scrollTo(0, 0);
      }}
    >
      {number}
    </div>
  );
};
