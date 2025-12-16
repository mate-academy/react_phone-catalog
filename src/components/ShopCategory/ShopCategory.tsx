import React from 'react';
import { Link } from 'react-router-dom';
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
  backgroundImage?: string;
  link?: string;
}

export const ShopCategory: React.FC<ShopCategoryProps> = ({
  imageAlt = 'Imagem do card',
  children,
  className = '',
  imageClassName = '',
  onClick,
  'data-testid': dataTestId = 'ShopCategory',
  backgroundImage,
  link,
}) => {
  const content = (
    <>
      <div
        className={`${styles.imageShop} ${imageClassName}`.trim()}
        role="img"
        aria-label={imageAlt}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className={styles.textContent}>{children}</div>
    </>
  );

  const Card = link ? (
    <Link
      to={link}
      className={`${styles.ShopCategory} ${className}`.trim()}
      onClick={onClick}
      data-testid={dataTestId}
      aria-label={imageAlt}
    >
      {content}
    </Link>
  ) : (
    <div
      className={`${styles.ShopCategory} ${className}`.trim()}
      onClick={onClick}
      data-testid={dataTestId}
      aria-label={imageAlt}
    >
      {content}
    </div>
  );

  // Wrapper externo para alinhar verticalmente
  return <div className={styles.ShopCategoryBlock}>{Card}</div>;
};

export default ShopCategory;
