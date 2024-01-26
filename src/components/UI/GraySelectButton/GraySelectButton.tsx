import React, { memo } from 'react';

import './GraySelectButton.scss';
import classNames from 'classnames';

interface Props {
  onClick?: () => void,
  children: React.ReactNode;
  selected?: boolean,
  extraClasses?: string,
}

export const GraySelectButton: React.FC<Props> = memo(({
  children,
  selected,
  extraClasses,
  onClick = () => {},
}) => (
  <button
    className={classNames(
      'gray-select-button',
      { 'gray-select-button--selected': selected },
      extraClasses,
    )}
    onClick={onClick}
  >
    {children}
  </button>
));
