import React from 'react';
import styles from './Typography.module.scss';
import { TypographyVariant } from './constants/typographyVariants';

type Props = {
  children: React.ReactNode;
  variant?: TypographyVariant;
  className?: string;
};

type TypographyConfigItem = {
  tag: React.ElementType;
  className: string;
};

const typographyConfig: Record<TypographyVariant, TypographyConfigItem> = {
  h1: {
    tag: 'h1',
    className: styles.h1,
  },

  h2: {
    tag: 'h2',
    className: styles.h2,
  },

  h3: {
    tag: 'h3',
    className: styles.h3,
  },

  h4: {
    tag: 'h4',
    className: styles.h4,
  },
};

export const Typography: React.FC<Props> = ({
  children,
  variant = 'h1',
  className = '',
}) => {
  const { tag: Component, className: variantClass } = typographyConfig[variant];

  return (
    <Component className={`${variantClass} ${className}`}>{children}</Component>
  );
};
