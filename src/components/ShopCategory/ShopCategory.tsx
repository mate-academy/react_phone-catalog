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
  backgroundImage?: string; // <== nova prop
}

export const ShopCategory: React.FC<ShopCategoryProps> = ({
  imageAlt = 'Imagem do card',
  children,
  className = '',
  imageClassName = '',
  onClick,
  'data-testid': dataTestId = 'ShopCategory',
  backgroundImage, // <== nova prop recebida
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
        style={{ backgroundImage: `url(${backgroundImage})` }} // <== aplique inline
      />
      <div className={`${styles.textContent}`.trim()}>{children}</div>
    </div>
  );
};

export default ShopCategory;
