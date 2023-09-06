import { useState } from 'react';
import classNames from 'classnames';
import './AvailableCapacity.scss';

type Props = {
  currCapacity: string,
  capacities: string[],
};

export const AvailableCapacity: React.FC<Props> = ({
  capacities,
  currCapacity,
}) => {
  const [selected, setSelected] = useState(0);

  console.log('availableCapacity', capacities[selected]);

  return (
    <div className="capacity">
      <div className="capacity__list">
        {capacities.map((capacity, ind) => (
          <button
            type="button"
            onClick={() => setSelected(ind)}
            className={classNames('capacity__btn', {
              'capacity__btn--current': capacity === currCapacity,
            })}
          >
            {capacity}
          </button>
        ))}
      </div>
    </div>
  );
};
