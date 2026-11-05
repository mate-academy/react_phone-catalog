import type { ElementType, ComponentPropsWithoutRef } from 'react';

export const TypographyVariant = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  uppercase: 'uppercase',
  button: 'button',
  bodytext: 'bodytext',
  smalltext: 'smalltext',
} as const;

export type TypographyVariant =
  (typeof TypographyVariant)[keyof typeof TypographyVariant];

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T;
  variant?: TypographyVariant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>;
