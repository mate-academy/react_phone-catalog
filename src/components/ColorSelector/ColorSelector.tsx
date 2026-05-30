import { useMemo } from 'react';

import { Item } from '../../types/Item';

import styles from './ColorSelector.module.scss';
const {
  colorSelector,
  title,
  colorOptions,
  colorCircle,
  innerCircle,
  isActive,
  line,
} = styles;

type ColorSelectorProps = {
  item: Item;
  colors: string[];
  onColorChange: (newItemId: string) => void;
  itemOptions: Item[];
};

const colorPalette: { [key: string]: string } = {
  midnight: '#1B222B',
  yellow: '#F9E470',
  purple: '#E6DFED',
  spacegray: '#828589',
  'space gray': '#828589',
  silver: '#E3E3E5',
  gold: '#F8DAD0',
  'rose gold': '#ECC4BC',
  rosegold: '#ECC4BC',
  blue: '#33384F',
  'sky blue': '#C1D1DE',
  red: '#F44C54',
  green: '#C5D5C0',
  starlight: '#F3EDE8',
  pink: '#F9E5E4',
  black: '#16171B',
  graphite: '#666460',
  sierrablue: '#9FB8D2',
  spaceblack: '#3E3C3B',
  white: '#FCF6F1',
};

export const ColorSelector = ({
  item,
  colors,
  onColorChange,
  itemOptions,
}: ColorSelectorProps) => {
  const handleColorChange = (color: string) => {
    if (color === item.color) return;

    const newColor = color === 'rose gold' ? 'rose-gold' : color;

    const newItem = itemOptions.find(
      (option) =>
        option.namespaceId === item.namespaceId &&
        option.capacity === item.capacity &&
        option.color === newColor,
    );

    if (newItem) {
      onColorChange(newItem.id);
    }
  };

  const colorButtons = useMemo(
    () =>
      colors.map((color, index) => {
        const colorValue = colorPalette[color.toLowerCase()];
        return (
          <button
            key={index}
            onClick={() => handleColorChange(color)}
            className={`${colorCircle} ${item.color === color ? isActive : ''}`}
            disabled={item.color === color}
          >
            <div
              className={innerCircle}
              style={{ backgroundColor: colorValue }}
            />
          </button>
        );
      }),
    [colors, item.color],
  );

  return (
    <div className={colorSelector}>
      <h3 className={title}>Available colors</h3>
      <div className={colorOptions}>{colorButtons}</div>
      <div className={line} />
    </div>
  );
};
