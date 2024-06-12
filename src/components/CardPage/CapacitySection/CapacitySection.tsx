import classNames from 'classnames';
import React, { useState } from 'react';
import './CapacitySectionStyle.scss';

interface Props {
  capacity: string[];
}

const CapacitySection: React.FC<Props> = ({ capacity }) => {
  const [selected, setSelected] = useState(capacity[0]);

  const handleClick = elem => {
    setSelected(elem);
  };

  return (
    <>
      <div className="details__capacity--title">Select capacity</div>
      <div className="details__capacity--items">
        {capacity.map(elem => (
          <button
            className={classNames('details__capacity--item', {
              'selected-capacity': elem === selected,
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
