import React from 'react';
import styles from './Title.module.css';

export type TitleVariant = 'default' | 'banner';

export type TitleProps = {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: TitleVariant;
  className?: string;
  'data-testid'?: string;
  actions?: React.ReactNode;
};

const Title: React.FC<TitleProps> = ({
  text,
  level = 1,
  variant = 'default',
  className = '',
  'data-testid': dataTestId,
  actions,
}) => {
  const Tag =
    `h${Math.min(Math.max(level, 1), 6)}` as keyof JSX.IntrinsicElements;

  // monta a classe: sempre aplica styles.title + variante + extra className
  const variantClass = variant === 'banner' ? styles.bannerTitle : styles.title;

  return (
    <div className={styles.titleRow}>
      <Tag
        className={`${variantClass} ${className}`.trim()}
        data-testid={dataTestId}
      >
        {text}
      </Tag>
      {actions && <div className={styles.titleRowActions}>{actions}</div>}
    </div>
  );
};

export default Title;
