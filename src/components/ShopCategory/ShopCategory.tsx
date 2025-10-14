// ShopCategory.tsx
import React from 'react';
import styles from './ShopCategory.module.css';

export interface ShopCategoryProps {
  imageAlt?: string;
  title?: string;
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
  'data-testid'?: string;
}

export const Card: React.FC<ShopCategoryProps> = ({
  imageAlt = 'Imagem do card',
  children,
  className = '',
  imageClassName = '',
  onClick,
  'data-testid': dataTestId = 'ShopCategory',
}) => {
  return (
    <div
      className={`${styles.ShopCategory} ${className}`.trim()}
      onClick={onClick}
      data-testid={dataTestId}
    >
      <div
        className={`${styles.imageShop} ${imageClassName}`.trim()}
        role="img"
        aria-label={imageAlt}
      />
      {children}
    </div>
  );
};

export default Card;
