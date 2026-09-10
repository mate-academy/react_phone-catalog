import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { Accessory } from '../../types/Accessory';

import './AvaibleColorsConfigurate.scss';

type Props = {
  selectedProduct: Phone | Tablet | Accessory | undefined;
  currentMemory: string | undefined;
};

export const AvaibleColorsConfigurate: React.FC<Props> = ({
  selectedProduct,
  currentMemory,
}) => {
  const navigate = useNavigate();

  const colorsAvailable = selectedProduct?.colorsAvailable;

  const colorMap: Record<string, string> = {
    black: '#000000',
    green: '#00ff00',
    yellow: '#ffff00',
    white: '#ffffff',
    purple: '#800080',
    red: '#ff0000',
    spacegray: '#4b4b4b',
    midnightgreen: '#004953',
    gold: '#ffd700',
    silver: '#c0c0c0',
    rosegold: '#b76e79',
    coral: '#ff7f50',
    midnight: '#191970',
    spaceblack: '#1c1c1c',
    blue: '#0000ff',
    pink: '#ffc0cb',
    graphite: '#2a2a2a',
    sierrablue: '#6f8fa3',
  };

  return (
    <div>
      <p className="details-info__configurate-text text-small secondary">
        Available colors
      </p>
      <div className="color-balls">
        {colorsAvailable?.map(color => (
          <div
            className="color-ball"
            key={color}
            onClick={() => {
              navigate(
                `/${selectedProduct?.category}/${selectedProduct?.namespaceId}-${currentMemory}-${color}`,
              );
            }}
          >
            <div
              className={
                color === selectedProduct?.color
                  ? 'color-ball__contour--active'
                  : 'color-ball__contour'
              }
            >
              <div
                className="color-ball__fill"
                style={{ backgroundColor: colorMap[color] || '#000' }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvaibleColorsConfigurate;
