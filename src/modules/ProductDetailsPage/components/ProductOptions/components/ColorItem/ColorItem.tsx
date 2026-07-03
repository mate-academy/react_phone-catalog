//#region imports
import cn from 'classnames';
import { FC } from 'react';
import baseStyles from './base.module.scss';
import styles from './ColorItem.module.scss';
//#endregion

type Props = {
  color: string;
  isSelected: boolean;
};

const colorMap: Record<string, string> = {
  midnight: '#171E27',
  spaceblack: '#424245',
  'space black': '#424245',
  spacegray: '#5F5F63',
  'space gray': '#5F5F63',
  starlight: '#FAF7F2',
  midnightgreen: '#4E5851',
  'midnight green': '#4E5851',
  sierrablue: '#9BB5CE',
  'sierra blue': '#9BB5CE',
  graphite: '#3A3A3C',
  rosegold: '#E0BFB8',
  'rose gold': '#E0BFB8',
  skyblue: '#87CEEB',
  'sky blue': '#87CEEB',
};

const getColor = (colorName: string): string => {
  return colorMap[colorName.toLowerCase()] ?? colorName;
};

export const ColorItem: FC<Props> = ({ color, isSelected }) => (
  <div
    className={cn(baseStyles.colorItem, styles.colorItem, {
      [styles.selected]: isSelected,
    })}
  >
    <div
      className={styles.color}
      style={{ backgroundColor: getColor(color) }}
    />
  </div>
);

export const renderColorItem = (color: string, isSelected: boolean) => (
  <ColorItem color={color} isSelected={isSelected} />
);
