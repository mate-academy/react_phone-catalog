import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import { Element } from './types';
import { VARIANT } from './vaiables';
import classes from './text.module.scss';

type Props = { element?: Element } & ComponentPropsWithoutRef<Element>;

export const TextRegular: FC<Props> = ({
  element = 'span',
  className: extraClassName,
  children,
  ...props
}) => {
  const className = cn(classes.text, VARIANT.regular, extraClassName);

  return React.createElement(element, { className, ...props }, children);
};
