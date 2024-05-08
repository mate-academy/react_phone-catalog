import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import classes from './text.module.scss';

type Element = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
type Variant =
  | 'regular'
  | 'small'
  | 'button'
  | 'uppercase'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'heading-4';

type Props = { variant?: Variant; element?: Element } & ComponentProps<Element>;

const VARIANT: Record<Variant, string> = {
  regular: classes.text_body,
  small: classes.text_small,
  button: classes.text_button,
  uppercase: classes.text_uppercase,
  'heading-1': classes['text_heading-1'],
  'heading-2': classes['text_heading-2'],
  'heading-3': classes['text_heading-3'],
  'heading-4': classes['text_heading-4'],
};

export const Text: FC<Props> = ({
  element = 'p',
  variant = 'regular',
  className: extraClassName,
  children,
  ...props
}) => {
  const className = cn(classes.text, VARIANT[variant], extraClassName);

  return React.createElement(element, { className, ...props }, children);
};
