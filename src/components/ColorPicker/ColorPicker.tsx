import React, { useState } from 'react';
import './ColorPicker.scss';

type Props = {
  colors: string[] | string;
};

export const ColorPicker: React.FC<Props> = ({ colors }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const colorsArray = typeof colors === 'string' ? [colors] : colors;

  return (
    <div className="color-picker">
      {colorsArray.map(color => (
        <div
          key={color}
          className={`color-picker__circle-wrapper ${
            selectedColor === color
              ? 'color-picker__circle-wrapper--selected'
              : ''
          }`}
          onClick={() => setSelectedColor(color)}
        >
          <div
            className="color-picker__circle"
            style={{ backgroundColor: color }}
          />
        </div>
      ))}
    </div>
  );
};
