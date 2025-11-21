import React from 'react';
import styles from './Title.module.css';

export type TitleProps = {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  'data-testid'?: string;
};

const Title: React.FC<TitleProps> = ({
  text,
  level = 1,
  className = '',
  'data-testid': dataTestId,
}) => {
  const Tag =
    `h${Math.min(Math.max(level, 1), 6)}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={`${styles.title} ${className}`.trim()}
      data-testid={dataTestId}
    >
      {text}
    </Tag>
  );
};

export default Title;
