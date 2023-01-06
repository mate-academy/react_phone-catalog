import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  capacityAvailable: string[],
  selectedCapacity: string,
  setSelectedCapacity: React.Dispatch<React.SetStateAction<string>>,
};

export const Capacity: FC<Props> = ({
  capacityAvailable,
  selectedCapacity,
  setSelectedCapacity,
}) => {
  return (
    <div className="options-wrapper">
      {capacityAvailable.map(el => {
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
