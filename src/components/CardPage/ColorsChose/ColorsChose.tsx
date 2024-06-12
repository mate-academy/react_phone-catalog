import React, { useState } from 'react';
import './colorShoseStyle.scss';
import classNames from 'classnames';

interface Props {
  colors: string[];
}

const ColorsChose: React.FC<Props> = ({ colors }) => {
  const [color, setColor] = useState(colors[0]);

  const handleClick = elem => {
    setColor(elem);
  };

  return (
    <div className="details__colors">
      {colors.map(elem => (
        <button
          className={classNames('details__colors--item', {
            'chosen-color': elem === color,
          })}
          key={elem}
          onClick={() => handleClick(elem)}
        >
          <div
            className="details__colors--inner"
            style={{ backgroundColor: elem }}
          ></div>
        </button>
      ))}
    </div>
  );
};

export default ColorsChose;
