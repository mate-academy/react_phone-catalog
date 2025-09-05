import React from 'react';
import style from './ColorPicker.module.scss';

type Props = {
  activeColor?: string;
  colors: string[] | string;
  onColorChange?: (color: string) => void;
};

const colorMap: Record<string, string> = {
  red: '#B85C5C',
  black: '#4C4C4C',
  green: '#5F7170',
  blue: '#5FBFC0',
  white: '#F0F0F0',
  yellow: '#FCDBC1',
  purple: '#7A6FA1',
  spacegray: '#3C3C3C',
  midnightgreen: '#004953',
};

export const ColorPicker: React.FC<Props> = ({
  activeColor,
  colors,
  onColorChange,
}) => {
  const colorsArray = typeof colors === 'string' ? [colors] : colors;

  return (
    <div className={style['color-picker']}>
      {colorsArray.map(colorName => {
        const hex = colorMap[colorName] || colorName;

        return (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label
            key={colorName}
            className={`${style['color-picker__circle-wrapper']} ${
              activeColor === colorName
                ? style['color-picker__circle-wrapper--selected']
                : ''
            }`}
            style={{ cursor: 'pointer' }}
          >
            <input
              type="radio"
              name="color"
              value={colorName}
              checked={activeColor === colorName}
              onChange={() => onColorChange?.(colorName)}
              style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                margin: 0,
                padding: 0,
                overflow: 'hidden',
                clip: 'rect(0 0 0 0)',
                border: 0,
              }}
            />
            <span
              className={style['color-picker__circle']}
              style={{ backgroundColor: hex }}
            />
          </label>
        );
      })}
    </div>
  );
};
