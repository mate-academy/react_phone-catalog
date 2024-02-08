import React, { memo, useState } from 'react';

import './Counter.scss';

interface Props {
  initialCount?: number,
  max?: number,
  min?: number,
  onIncrease?: (newAmount: number) => void,
  onDecrease?: (newAmount: number) => void,
}

export const Counter: React.FC<Props> = memo(({
  initialCount,
  max,
  min,
  onIncrease = () => {},
  onDecrease = () => {},
}) => {
  const [count, setCount] = useState(initialCount ?? 0);

  const decrease = () => {
    setCount(currentCount => {
      const newCount = currentCount - 1;

      onDecrease(newCount);

      return newCount;
    });
  };

  const increase = () => {
    setCount(currentCount => {
      const newCount = currentCount + 1;

      onIncrease(newCount);

      return newCount;
    });
  };

  return (
    <div className='counter'>
      <button
        className='counter__button'
        onClick={decrease}
        disabled={!!(min && count <= min)}
      >
        <img src="/img/icons/minus-icon.svg" alt="" />
      </button>

      <p className='counter__count'>
        {count}
      </p>

      <button
        className='counter__button'
        onClick={increase}
        disabled={!!(max && count >= max)}
      >
        <img src="/img/icons/plus-icon.svg" alt="" />
      </button>
    </div>
  );
});
