import React from 'react';
import { HeadingLevel } from '../../types/HeadingLevel';
import classNames from 'classnames';

interface Props {
  children: React.ReactNode;
  level?: HeadingLevel;
  hidden?: boolean;
}

export const Title: React.FC<Props> = ({
  children,
  level = HeadingLevel.h1,
  hidden = false,
}) => {
  const Tag = level;

  return (
    <Tag
      className={classNames(`title-${level}`, {
        hidden: hidden,
      })}
    >
      {children}
    </Tag>
  );
};
