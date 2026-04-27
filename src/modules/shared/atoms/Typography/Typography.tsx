import React from 'react';
import classNames from 'classnames';
import styles from './Typography.module.scss';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'label';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'uppercase'
  | 'buttons'
  | 'body'
  | 'small'
  | 'label';

type Color = 'primary' | 'secondary' | 'success' | 'error' | 'inherit';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  tag?: Tag;
  variant: Variant;
  children: React.ReactNode;
  className?: string;
  color?: Color;
  htmlFor?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  tag = 'span',
  variant,
  children,
  className,
  color = 'primary',
  htmlFor,
  ...props
}) => {
  const Tag = tag;

  return (
    <Tag
      {...(tag === 'label' ? { htmlFor } : {})}
      className={classNames(
        styles.typography,
        styles[`typography--${variant}`],
        color && styles[`typography--color--${color}`],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};
