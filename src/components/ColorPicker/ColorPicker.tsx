import React, { useEffect, useState } from 'react';
import styles from './ColorPicker.module.scss';

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
};

export const ColorPicker: React.FC<Props> = ({
  activeColor,
  colors,
  onColorChange,
}) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(
    activeColor ? colorMap[activeColor] || activeColor : null,
  );

  const colorsArray = typeof colors === 'string' ? [colors] : colors;

  useEffect(() => {
    if (activeColor) {
      setSelectedColor(colorMap[activeColor] || activeColor);
    }
  }, [activeColor]);

  return (
    <div className={styles['color-picker']}>
      {colorsArray.map(colorName => {
        const hex = colorMap[colorName] || colorName; // hex для фону
        return (
          <div
            key={colorName}
            className={`${styles['color-picker__circle-wrapper']} ${
              selectedColor === colorName
                ? styles['color-picker__circle-wrapper--selected']
                : ''
            }`}
            onClick={() => {
              setSelectedColor(colorName); 
              onColorChange?.(colorName); 
            }}
          >
            <div
              className={styles['color-picker__circle']}
              style={{ backgroundColor: hex }} 
            />
          </div>
        );
      })}
    </div>
  );
};
