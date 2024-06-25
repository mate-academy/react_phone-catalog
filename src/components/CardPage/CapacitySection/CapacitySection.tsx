import classNames from 'classnames';
import React from 'react';
import './CapacitySectionStyle.scss';

interface Props {
  capacity: string[];
  handleSetCapacity: (arg: string) => void;
  selectedCapacity: string;
}

const CapacitySection: React.FC<Props> = ({
  capacity,
  handleSetCapacity,
  selectedCapacity,
}) => {
  const handleClick = (elem: string) => {
    handleSetCapacity(elem);
  };

  return (
    <>
      <div className="details__capacity--title">Select capacity</div>
      <div className="details__capacity--items">
        {capacity.map(elem => (
          <button
            className={classNames('details__capacity--item', {
              'selected-capacity': elem === selectedCapacity,
            })}
            key={elem}
            onClick={() => handleClick(elem)}
          >
            {elem}
          </button>
        ))}
      </div>
    </>
  );
};

export default CapacitySection;
