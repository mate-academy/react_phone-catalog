import classNames from 'classnames';
import { useState } from 'react';

import './capacity.scss';

const memorySize = ['64GB', '256GB', '512GB'];

export const Capacity = () => {
  const [memory, setMemory] = useState(memorySize[0]);

  const chooseMemory = (item: string) => {
    setMemory(item);
  };

  return (
    <div className="capacity">
      <span>Select capacity</span>
      <div className="capacity__button">
        {memorySize.map((el: string) => (
          <button
            className={classNames({
              'active-memory': el === memory,
            })}
            type="button"
            key={el}
            onClick={() => chooseMemory(el)}
          >
            {el}
          </button>
        ))}
      </div>
    </div>
  );
};
