import React, { memo } from 'react';

import './SquareSelectButton.scss';
import classNames from 'classnames';

export interface SquareSelectButtonProps {
  onClick?: () => void,
  selected: boolean,
  extraClasses?: string,
  icon: string,
  iconSelected?: string,
}

export const SquareSelectButton: React.FC<SquareSelectButtonProps> = memo(({
  icon,
  iconSelected,
  selected,
  extraClasses,
  onClick = () => {},
}) => (
  <button
    type="button"
    aria-label="square select button"
    className={classNames(
      'square-select-button',
      { 'square-select-button--selected': selected },
      extraClasses,
    )}
    onClick={onClick}
  >
    <img src={selected ? (iconSelected || icon) : icon} alt="" />
  </button>
));
