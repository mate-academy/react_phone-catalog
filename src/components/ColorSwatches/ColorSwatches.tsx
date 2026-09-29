import React from 'react';
import classNames from '../../utils/classNames';
import { getSwatchColor } from '../../utils/colorMap';
import './ColorSwatches.scss';

interface Props {
  colors: string[];
  selected: string;
  onSelect: (color: string) => void;
  name?: string;
}

export const ColorSwatches: React.FC<Props> = ({
  colors,
  selected,
  onSelect,
  name = 'color',
}) => {
  return (
    <ul className="color-swatches">
      {colors.map(color => (
        <li key={color}>
          <label
            title={color}
            className={classNames('color-swatches__item', {
              'color-swatches__item--active': color === selected,
            })}
          >
            <input
              type="radio"
              name={name}
              value={color}
              checked={color === selected}
              onChange={() => onSelect(color)}
              className="color-swatches__input"
              aria-label={color}
            />
            <span
              className="color-swatches__circle"
              style={{ backgroundColor: getSwatchColor(color) }}
            />
          </label>
        </li>
      ))}
    </ul>
  );
};
