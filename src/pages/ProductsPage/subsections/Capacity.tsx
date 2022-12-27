import classNames from 'classnames';
import { useState } from 'react';

export const Capacity = () => {
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const capacityArray = ['64 GB', '256 GB', '512 GB'];

  return (
    <div className="options-wrapper">
      {capacityArray.map(el => {
        return (
          <button
            key={el}
            type="button"
            onClick={() => setSelectedCapacity(el)}
            className={classNames(
              'options-wrapper__capacity',
              {
                'options-wrapper__capacity--selected':
          el === selectedCapacity,
              },
            )}
          >
            {el}
          </button>
        );
      })}
    </div>
  );
};
