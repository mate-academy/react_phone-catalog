import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColorLink } from '../ColorMap/ColorLink.tsx';
import './ProductOptions.scss';

type Props = {
  itemId: string;
  namespaceId: string;
  colorsAvailable: string[];
  currentColor: string;
  capacityAvailable: string[];
  currentCapacity: string;
  onCapacityChange: (newItemId: string) => void;
  onColorChange?: (color: string) => void;
  onCapacitySelect?: (capacity: string) => void;
};

export const ProductOptions: React.FC<Props> = ({
  namespaceId,
  colorsAvailable,
  currentColor,
  capacityAvailable,
  currentCapacity,
  onCapacityChange,
  onColorChange,
  onCapacitySelect,
}) => {
  const { t } = useTranslation();
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();

  const buildItemId = (capacity: string, color: string) => {
    const formattedCapacity = capacity.toLowerCase().replace(/\s+/g, '-');
    const formattedColor = color.toLowerCase().replace(/\s+/g, '-');
    return `${namespaceId}-${formattedCapacity}-${formattedColor}`;
  };

  return (
    <div className="product-options">
      <div className="product-options__title">
        {t('product_details.colors', 'Available colors')}
      </div>

      <div className="product-options__colors">
        <ul className="product-options__list">
          {colorsAvailable.map((clr) => {
            const newItemId = buildItemId(currentCapacity, clr);
            const normalizedColor = clr.toLowerCase().replace(/\s+/g, '');

            const newParams = new URLSearchParams(searchParams);
            newParams.set('capacity', currentCapacity);
            newParams.set('color', clr);

            const targetLocation = `/${category}/${newItemId}?${newParams.toString()}`;

            return (
              <li
                key={clr}
                className="product-options__item"
              >
                <ColorLink
                  to={targetLocation}
                  color={normalizedColor}
                  selected={currentColor === clr}
                  onClick={() => onColorChange?.(clr)}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="product-options__title--capacity">
        {t('product_details.select_capacity', 'Select capacity')}
      </div>

      <div className="product-options__ram">
        {capacityAvailable.map((cap) => (
          <button
            key={cap}
            type="button"
            className={`product-options__ram-item ${
              currentCapacity === cap ? 'product-options__ram-item--active' : ''
            }`}
            onClick={() => {
              onCapacitySelect?.(cap);
              onCapacityChange(buildItemId(cap, currentColor));
            }}
          >
            {cap}
          </button>
        ))}
      </div>
    </div>
  );
};
