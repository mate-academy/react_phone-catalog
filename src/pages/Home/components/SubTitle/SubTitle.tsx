import React from 'react';
import styles from './SubTitle.module.css';

export type SubTitleProps = {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  'data-testid'?: string;
};

const SubTitle: React.FC<SubTitleProps> = ({
  text,
  level = 2,
  className = '',
  'data-testid': dataTestId = 'home-Subtitle',
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={`${styles.SubTitle} ${className}`.trim()}
      data-testid={dataTestId}
    >
      {text}
    </Tag>
  );
};

export default SubTitle;
