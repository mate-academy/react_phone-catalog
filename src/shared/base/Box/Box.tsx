import React, { useMemo } from 'react';

import cn from 'classnames';

import { DefaultPropsChildren } from '@shared/types/common';

import styles from './Box.module.scss';

export interface BoxProps extends DefaultPropsChildren {
  variant?: 'div' | 'span' | 'section';
  onClick?: VoidFunction;
}

export const Box: React.FC<BoxProps> = ({
  children,
  variant = 'div',
  className,
  ...rest
}) => {
  const Element = useMemo(
    () =>
      React.createElement(
        variant,
        { className: cn(styles[`box-${variant}`], className), ...rest },
        children,
      ),
    [variant, children, className, rest],
  );

  return Element;
};
