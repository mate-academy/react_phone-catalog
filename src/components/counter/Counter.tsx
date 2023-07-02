import React from 'react';

import './Counter.scss';

type Props = {
  count: number;
};

const Counter: React.FC<Props> = ({ count }) => {
  return (
    <div className="counter">
      {count}
    </div>
  );
};

export default Counter;
