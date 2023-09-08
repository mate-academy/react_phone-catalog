/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import classNames from 'classnames';
import './Colors.scss';

type Props = {
  colors: string[],
};

export const Colors: React.FC<Props> = ({ colors }) => {
  const [selected, setSelected] = useState<number | null>(0);

  console.log('color', selected);

  return (
    <div className="colors">
      <h2 className="colors__heading">Available colors</h2>
      <div className="colors__list">
        {colors.map((color, ind) => (
          <div
            key={color}
            className="colors__item"
            onClick={() => setSelected(ind)}
          >
            <div className={classNames('colors__border', {
              'colors__border--selected': ind === selected,
            })}
            >
              <div
                className="colors__circle"
                style={{ backgroundColor: `${color}` }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
