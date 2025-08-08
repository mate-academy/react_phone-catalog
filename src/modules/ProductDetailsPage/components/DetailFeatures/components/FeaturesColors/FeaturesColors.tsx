import React, { useCallback } from 'react';
import cn from 'classnames';
import style from './featuresColors.module.scss';

interface Props {
  itemId: string;
  currentColor: string;
  color: string;
  handleRedirect: (currentParam: string, newParam: string) => Promise<void>;
}

const colorMap: Record<string, string> = {
  spacegray: '#5C5A59',
  midnight: '#191970',
  midnightblue: '#191970',
  midnightgreen: '#58625A',
  deepgreen: '#006400',
  starlight: '#F8F8F8',
  rosegold: '#F7CFC8',
  coral: '#FE6750',
};

const colorLabelMap: Record<string, string> = {
  spacegray: 'Space Gray',
  midnightblue: 'Midnight Blue',
  midnightgreen: 'Midnight Green',
  deepgreen: 'Deep Green',
  starlight: 'Starlight',
  rosegold: 'Rose Gold',
  coral: 'Coral',
};

export const FeaturesColors: React.FC<Props> = React.memo(
  ({ currentColor, itemId, color, handleRedirect }) => {
    const getColor = useCallback(
      (colorName: string): string =>
        colorMap[colorName.toLowerCase()] || colorName,
      [],
    );

    return (
      <div
        className={cn(style.color, {
          [style['color--selected']]: itemId.includes(color),
        })}
        onClick={() => handleRedirect(currentColor, color)}
        title={colorLabelMap[color] || color}
      >
        <div
          className={cn(style.color__circle)}
          style={{ background: getColor(color) }}
        ></div>
      </div>
    );
  },
);

FeaturesColors.displayName = 'FeaturesColors';
