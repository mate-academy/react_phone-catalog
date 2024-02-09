import React, { memo } from 'react';
import { OptionsTogglerItemProps } from '../../OptionsToggler/OptionsToggler';
import { getColorHex } from '../../../../utils/servicesHelper';

import './ColorItem.scss';

type Props = OptionsTogglerItemProps;

export const ColorItem: React.FC<Props> = memo(({ option: color, isSelected }) => {
  const HEX = getColorHex(color);
  const classes = [
    'color-item',
    isSelected ? 'color-item--selected' : '',
  ].join(' ');

  return (
    <button className={classes} aria-label={`color ${color}`} type="button">
      <div className="color-item__color" style={{ backgroundColor: HEX }} />
    </button>
  );
});
