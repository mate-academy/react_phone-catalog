import type { ElementType } from 'react';

import type { TypographyProps, TypographyVariant } from './Typography.types';

import styles from './Typography.module.scss';

const defaultTag = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  uppercase: 'span',
  button: 'span',
  bodytext: 'p',
  smalltext: 'span',
} as const satisfies Record<TypographyVariant, ElementType>;

export const Typography = <T extends ElementType = 'p'>({
  as,
  variant = 'bodytext',
  className,
  children,
  ...props
}: TypographyProps<T>) => {
  const Component = as ?? defaultTag[variant];

  const classes = [styles.typography, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      {...props}
      className={classes}
    >
      {children}
    </Component>
  );
};
