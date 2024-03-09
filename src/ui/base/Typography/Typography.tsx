import React from 'react';
import clsx from 'clsx';

import './Typography.scss';

type BaseProps = {
  type: 'title' | 'text';
  className?: string;
  children: React.ReactNode;
  textTransform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none' | null;
  textAlign?: 'center' | 'left' | 'right' | null;
  cypressParam?: string | null;
};

type TitleProps = {
  level: '1' | '2' | '3';
  weight?: never;
  size?: never;
};

type TextProps = {
  level?: never;
  weight?: '400' | '500' | '600' | '700';
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

type Props = BaseProps & (TitleProps | TextProps);

export const Typography: React.FC<Props> = ({
  type,
  level = '3',
  weight = '400',
  size = 'md',
  textTransform = null,
  textAlign = null,
  className = '',
  cypressParam = null,
  children,
}) => {
  if (type === 'title') {
    switch (level) {
      case '1':
        return (
          <h1
            className={clsx(
              'title',
              'title-1',
              textTransform && `text-transform-${textTransform}`,
              textAlign && `text-align-${textAlign}`,
              className,
            )}
            data-cy={cypressParam}
          >
            {children}
          </h1>
        );
      case '2':
        return (
          <h2
            className={clsx(
              'title',
              'title-2',
              textTransform && `text-transform-${textTransform}`,
              className,
            )}
            data-cy={cypressParam}
          >
            {children}
          </h2>
        );
      default:
        return (
          <h3
            className={clsx(
              'title',
              'title-3',
              textTransform && `text-transform-${textTransform}`,
              className,
            )}
            data-cy={cypressParam}
          >
            {children}
          </h3>
        );
    }
  }

  return (
    <span
      className={clsx(
        'typography',
        `typography-${weight}`,
        `typography-${size}`,
        textTransform && `text-transform-${textTransform}`,
        className,
      )}
      data-cy={cypressParam}
    >
      {children}
    </span>
  );
};
