/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import style from './ProductOptions.module.scss';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

type Props = {
  colors: string[];
  capacities: string[];
  color: string;
  capacity: string;
  id: string;
};

export const ProductOptions: React.FC<Props> = ({
  colors,
  capacities,
  color,
  capacity,
  id,
}) => {
  const navigate = useNavigate();

  const colorMap = {
    spacegray: 'darkgrey',
    midnightgreen: 'mediumseagreen',
    rosegold: 'rosybrown',
    midnight: '#070606dd',
    spaceblack: '#111',
    graphite: 'lightgrey',
    sierrablue: 'darkblue',
    'space gray': 'lightslategray',
  };

  const reverseColorMap = Object.fromEntries(
    Object.entries(colorMap).map(([original, mapped]) => [mapped, original]),
  );

  const normalizedColor = colorMap[color as keyof typeof colorMap] || color;
  const normalizedColors = colors.map(
    col => colorMap[col as keyof typeof colorMap] || col,
  );

  const primaryColor = normalizedColors?.indexOf(normalizedColor);
  const [selectedColor, setSelectedColor] = useState(
    normalizedColors[primaryColor],
  );

  const primaryCapacity = capacities.indexOf(capacity);
  const [selectedCapacity, setSelectedCapacity] = useState(
    capacities[primaryCapacity],
  );

  const generateNewId = (newColor: string, newCapacity: string) => {
    const originalColor = reverseColorMap[newColor]
      ? reverseColorMap[newColor].includes(' ')
        ? reverseColorMap[newColor].split(' ').join('-')
        : reverseColorMap[newColor]
      : newColor;

    const partsId = id.split('-');

    if (partsId[partsId.length - 2] === 'space') {
      partsId.splice(partsId.length - 2, 2, originalColor);
    } else {
      partsId[partsId.length - 1] = originalColor;
    }

    const capacityIndex = partsId.findIndex(
      part =>
        capacities.includes(part.toUpperCase()) || capacities.includes(part),
    );

    if (capacityIndex !== -1) {
      partsId[capacityIndex] = newCapacity.toLowerCase();
    }

    return partsId.join('-');
  };

  const handleProductChange = (newColor: string, newCapacity: string) => {
    const newId = generateNewId(newColor, newCapacity);

    navigate(`/product/${newId}`);
  };

  return (
    <div className={style.options}>
      <div className={style.colors}>
        <p className={style.title}>{t('colors')}</p>
        <div className={style.colors__options}>
          {normalizedColors.map(col => (
            <label key={col} className={style.colors__label}>
              <input
                type="radio"
                name="color"
                className={style.colors__input}
                value={col}
                checked={selectedColor === col}
                onChange={() => {
                  setSelectedColor(col);
                  handleProductChange(col, selectedCapacity);
                }}
              />
              <span
                className={style.colors__circle}
                style={{ backgroundColor: col }}
              ></span>
            </label>
          ))}
        </div>
      </div>
      <div className={style.capacity}>
        <p className={style.title}>{t('selectCapacity')}</p>
        <div className={style.capacity__options}>
          {capacities.map(cap => (
            <label key={cap} className={style.capacity__label}>
              <input
                type="radio"
                name="capacity"
                className={style.capacity__input}
                value={cap}
                checked={selectedCapacity === cap}
                onChange={() => {
                  setSelectedCapacity(cap);
                  handleProductChange(selectedColor, cap);
                }}
              />
              <span className={style.capacity__box}>{cap}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
