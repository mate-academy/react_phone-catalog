import React from 'react';
import cn from 'classnames';

import type { Product } from '../../../types/product';
import { formatOption, getColorValue, normalizeOption } from '../productOptions';
import { block, cx, styles } from './styles';

interface Props {
  displayId: string | number;
  colors: string[];
  capacities: (string | number)[];
  selectedColorValue: string;
  selectedCapacityValue: string;
  findVariant: (capacity: string | number, color: string) => Product | undefined;
  onSelectVariant: (capacity: string | number, color: string) => void;
}

export const ProductOptions: React.FC<Props> = ({
  displayId,
  colors,
  capacities,
  selectedColorValue,
  selectedCapacityValue,
  findVariant,
  onSelectVariant,
}) => (
  <>
    {colors.length > 0 && (
      <fieldset className={cx('options')}>
        <div className={cx('option-header')}>
          <legend>Available colors</legend>
          <span>ID: {displayId}</span>
        </div>

        <div className={cx('color-group')}>
          {colors.map(color => {
            const variant = findVariant(selectedCapacityValue, color);
            const isSelected = normalizeOption(selectedColorValue) === normalizeOption(color);

            return (
              <label
                key={color}
                className={cn(cx('color-button'), {
                  [styles[`${block}__color-button--selected`]]: isSelected,
                  [styles[`${block}__color-button--disabled`]]: !variant,
                })}
                style={
                  {
                    '--option-color': getColorValue(color),
                  } as React.CSSProperties
                }
                aria-label={`Choose ${color}`}
              >
                <input
                  type="radio"
                  name="product-color"
                  value={color}
                  checked={isSelected}
                  disabled={!variant}
                  onChange={() => onSelectVariant(selectedCapacityValue, color)}
                />
              </label>
            );
          })}
        </div>
      </fieldset>
    )}

    {capacities.length > 0 && (
      <fieldset className={cx('options')}>
        <legend>Select capacity</legend>

        <div className={cx('capacity-group')}>
          {capacities.map(capacity => {
            const variant = findVariant(capacity, selectedColorValue);
            const isSelected = normalizeOption(selectedCapacityValue) === normalizeOption(capacity);

            return (
              <label
                key={String(capacity)}
                className={cn(cx('capacity-button'), {
                  [styles[`${block}__capacity-button--selected`]]: isSelected,
                  [styles[`${block}__capacity-button--disabled`]]: !variant,
                })}
              >
                <input
                  type="radio"
                  name="product-capacity"
                  value={String(capacity)}
                  checked={isSelected}
                  disabled={!variant}
                  onChange={() => onSelectVariant(capacity, selectedColorValue)}
                />
                {formatOption(capacity)}
              </label>
            );
          })}
        </div>
      </fieldset>
    )}
  </>
);
