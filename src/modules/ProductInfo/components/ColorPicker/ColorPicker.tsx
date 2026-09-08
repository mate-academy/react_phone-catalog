import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductsInfo } from '../../../../shared/types/ProductsInfo';
import styles from './ColorPicker.module.scss';

type ColorPickerProps = {
  product: ProductsInfo;
  colors: string[];
  selectedColor: string;
  onSelect: (color: string) => void;
};

const colorMap: Record<string, string> = {
  spacegray: 'rgba(50, 50, 53, 1)',
  silver: 'rgba(240, 240, 245, 1)',
  gold: 'rgba(255, 215, 180, 1)',
  midnight: 'rgba(25, 25, 30, 1)',
  starlight: 'rgba(252, 248, 240, 1)',
  blue: 'rgba(45, 105, 170, 1)',
  green: 'rgba(60, 125, 95, 1)',
  purple: 'rgba(150, 125, 180, 1)',
  red: 'rgba(200, 0, 35, 1)',
  yellow: 'rgba(255, 240, 140, 1)',
  black: 'rgba(15, 15, 20, 1)',
  white: 'rgba(255, 255, 255, 1)',
  midnightgreen: 'rgba(30, 60, 50, 1)',
  rosegold: 'rgba(255, 190, 200, 1)',
  coral: 'rgba(255, 125, 100, 1)',
  spaceblack: 'rgba(10, 10, 10, 1)',
  pink: 'rgba(255, 200, 220, 1)',
  sierrablue: 'rgba(100, 150, 200, 1)',
  graphite: 'rgba(80, 80, 85, 1)',
  skyblue: 'rgba(180, 220, 250, 1)',
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  product,
  colors,
  selectedColor,
  onSelect,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleColorSelect = (color: string) => {
    onSelect(color);
    let modelWithoutColor: string | undefined = '';
    const idParts = id?.split('-');
    const hasNumber =
      idParts && idParts.length > 0
        ? /\d/.test(idParts[idParts.length - 2])
        : false;

    const validColor = color.includes(' ')
      ? color.replace(/\s+/g, '-').toLowerCase()
      : color.toLowerCase();

    if (idParts) {
      if (hasNumber) {
        modelWithoutColor = idParts.slice(0, -1).join('-');
      } else {
        modelWithoutColor = idParts.slice(0, -2).join('-');
      }
    } else {
      modelWithoutColor = '';
    }

    const newId = `${modelWithoutColor}-${validColor}`;

    navigate(`/${product.category}/${newId}`);
  };

  return (
    <div className={styles.colorPicker}>
      {colors.map(color => {
        const normalizedColor = color.toLowerCase();
        const displayColor = colorMap[normalizedColor] || normalizedColor;

        return (
          <div
            key={color}
            className={`${styles.colorOption} ${
              selectedColor === color ? styles.active : ''
            }`}
          >
            <button
              className={styles.colorCircle}
              style={{ backgroundColor: displayColor }}
              onClick={() => handleColorSelect(color)}
              title={color}
            />
          </div>
        );
      })}
    </div>
  );
};
