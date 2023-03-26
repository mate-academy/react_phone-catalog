import classNames from 'classnames';
import { useState } from 'react';

import './color.scss';

const colors = ['#FCDBC1', '#5F7170', '#4C4C4C', '#F0F0F0'];

export const Colors = () => {
  const [color, setColor] = useState(colors[0]);

  const chooseColor = (item:string) => {
    setColor(item);
  };

  return (
    <div className="colors">
      <span>Available colors</span>
      <div className="wrapper-colors">
        {colors.map((el:string) => (
          <button
            type="button"
            className={classNames('color', {
              active: el === color,
            })}
            onClick={() => chooseColor(el)}
            key={el}
          >
            <div style={{ backgroundColor: `${el}` }} />
          </button>
        ))}
      </div>
    </div>
  );
};
