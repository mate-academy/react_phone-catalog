import React from 'react';

import cn from 'classnames';

import { DefaultPropsChildren } from '@shared/types/common';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'buttons'
  | 'body'
  | 'small'
  | 'crossed-out'
  | 'uppercase';

export interface TextProps extends DefaultPropsChildren {
  variant?: TextVariant;
}

export const createElement = (
  variant: TextVariant,
  { children, className, ...props }: TextProps,
) => {
  let Element = null;

  switch (variant) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
      Element = React.createElement(variant, { className, ...props }, children);
      break;

    case 'uppercase':
    case 'small':
    case 'crossed-out':
      Element = React.createElement(
        'span',
        { className: cn(variant, className), ...props },
        children,
      );
      break;

    case 'buttons':
    case 'body':
      Element = React.createElement(
        'p',
        { className: cn(variant, className), ...props },
        children,
      );
      break;
  }

  return Element;
};
