/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Button } from '../../base';

import './SelectNumber.scss';

type Props = {
  startValue: number;
  onChange: (v: number) => void;
  className?: string;
  cypressParam?: string | null;
};

export const SelectNumber: React.FC<Props> = ({
  startValue,
  onChange,
  className = null,
  cypressParam = null,
}) => {
  const [value, setValue] = useState<number>(startValue);

  const handleSub = () => {
    setValue(currentValue => currentValue - 1);
  };

  const handleAdd = () => {
    setValue(currentValue => currentValue + 1);
  };

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div className={clsx('number-select', className && className)}>
      <Button
        type="default"
        disabled={value === 1}
        className="number-select__button"
        onClickHandler={handleSub}
      >
        <span>-</span>
      </Button>
      <span className="number-select__value" data-cy={cypressParam}>
        {value}
      </span>
      <Button
        type="default"
        className="number-select__button"
        onClickHandler={handleAdd}
      >
        <span>+</span>
      </Button>
    </div>
  );
};
