import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ColorPicker.module.scss';
import classNames from 'classnames';

export const colorMap: Record<string, string> = {
  silver: '#c0c0c0',
  gold: '#c9ba93',
  blue: '#4682b4',
  red: '#fb1230',
  green: '#ade0d4',
  starlight: '#faf7f2',
  pink: '#f7d0cb',
  black: '#343b43',
  yellow: '#ffe681',
  white: '#f0f0f0',
  purple: '#e5ddea',
  midnight: '#1F272D',
  graphite: '#706C68',
  spacegray: '#717378',
  'space gray': '#717378',
  midnightgreen: '#5B665E',
  'midnight green': '#5B665E',
  spaceblack: '#5C5754',
  'space black': '#5C5754',
  sierrablue: '#A0B9D3',
  'sierra blue': '#A0B9D3',
  rosegold: '#FEDAD6',
  'rose gold': '#FEDAD6',
  skyblue: '#87ceeb',
  'sky blue': '#E6EEF6',
};

interface ColorPickerProps {
  colors: string[];
  currentColor: string;
  getNewPath: (color: string) => string;
  itemId: string;
  className?: string;
}

export const generateNumericId = (str: string): number => {
  if (!str) {
    return 0;
  }

  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);

    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

  return Math.abs(hash) % 1000000;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  currentColor,
  getNewPath,
  itemId,
  className,
}) => {
  const numericId = generateNumericId(itemId);

  return (
    <div className={classNames(styles.colorsSelectionBox, className)}>
      <div className={styles.header}>
        <p className={styles.label}>Available colors</p>
        <p className={styles.idNumber}>ID: {numericId}</p>
      </div>
      <div className={styles.colorsSelection}>
        {colors.map(color => (
          <Link
            to={getNewPath(color)}
            key={color}
            className={`${styles.colorButton} ${currentColor === color ? styles.active : ''}`}
            style={{ backgroundColor: colorMap[color] || color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};
