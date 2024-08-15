/* eslint-disable @typescript-eslint/indent */
import cn from 'classnames';

import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { ArrowIcon } from '../ArrowIcon';

import styles from './Button.module.scss';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  appearance: 'primary' | 'dark';
  arrow?: {
    type: 'left' | 'right' | 'none';
    fill: string;
  };
  size?: 'small' | 'normal' | 'large' | 'stretch';
}

export const Button: React.FC<Props> = ({
  appearance,
  children,
  arrow,
  size = 'normal',
  className = '',
  ...props
}) => {
  const arrowType = arrow?.type || 'none';

  return (
    <button
      className={cn(
        styles.button,
        styles[`${appearance}--${className}`],
        styles[`${appearance}--${size}`],
        className,
        {
          [styles.primary]: appearance === 'primary',
          [styles.dark]: appearance === 'dark',
          [styles.small]: size === 'small',
          [styles.normal]: size === 'normal',
          [styles.large]: size === 'large',
          [styles.stretch]: size === 'stretch',
          [styles.prev]: arrowType === 'left' && size === 'stretch',
          [styles.next]: arrowType === 'right' && size === 'stretch',
        },
      )}
      {...props}
    >
      {children}

      {arrowType !== 'none' && (
        <span
          className={cn(styles.arrow, {
            [styles.left]: arrowType === 'left',
            [styles.right]: arrowType === 'right',
          })}
        >
          <ArrowIcon fill={arrow?.fill} />
        </span>
      )}
    </button>
  );
};
